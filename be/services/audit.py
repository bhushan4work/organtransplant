import hashlib
import json
import os
from datetime import datetime
from sqlalchemy.orm import Session
from cryptography.hazmat.primitives.asymmetric import ed25519
from cryptography.hazmat.primitives import serialization
from db.models import AuditEvent, Checkpoint

def get_signing_key():
    hex_key = os.getenv("AUDIT_SIGNING_KEY_HEX")
    if hex_key:
        return ed25519.Ed25519PrivateKey.from_private_bytes(bytes.fromhex(hex_key))
    
    # Fallback for dev/test
    key = ed25519.Ed25519PrivateKey.generate()
    os.environ["AUDIT_SIGNING_KEY_HEX"] = key.private_bytes(
        encoding=serialization.Encoding.Raw,
        format=serialization.PrivateFormat.Raw,
        encryption_algorithm=serialization.NoEncryption()
    ).hex()
    return key

def hash_data(data: str) -> str:
    return hashlib.sha256(data.encode('utf-8')).hexdigest()

def calculate_merkle_root(hashes: list[str]) -> str:
    if not hashes:
        return hash_data("")
    
    current_level = hashes
    while len(current_level) > 1:
        next_level = []
        for i in range(0, len(current_level), 2):
            left = current_level[i]
            right = current_level[i+1] if i+1 < len(current_level) else left
            next_level.append(hash_data(left + right))
        current_level = next_level
    return current_level[0]

def append_audit_event(
    db: Session,
    actor_id: int | None,
    entity_type: str,
    entity_id: str,
    action: str,
    payload: dict | str
) -> AuditEvent:
    """
    Append an event to the ledger securely. Must be called within an active transaction.
    """
    if isinstance(payload, dict):
        payload_commit = json.dumps(payload, separators=(',', ':'), sort_keys=True)
    else:
        payload_commit = str(payload)
        
    # Get previous event to chain hashes
    last_event = db.query(AuditEvent).order_by(AuditEvent.sequence.desc()).first()
    previous_hash = last_event.event_hash if last_event else "GENESIS"
    
    now = datetime.utcnow()
    
    # Calculate event hash
    # Hash(previous_hash + timestamp + actor + entity_type + entity_id + action + payload_commit)
    hash_input = f"{previous_hash}|{now.isoformat()}|{actor_id}|{entity_type}|{entity_id}|{action}|{payload_commit}"
    event_hash = hash_data(hash_input)
    
    event = AuditEvent(
        timestamp=now,
        actor_id=actor_id,
        entity_type=entity_type,
        entity_id=entity_id,
        action=action,
        payload_commit=payload_commit,
        previous_hash=previous_hash,
        event_hash=event_hash
    )
    
    db.add(event)
    db.flush()
    return event

def create_checkpoint(db: Session, batch_size: int = 100) -> Checkpoint | None:
    """
    Create a signed checkpoint of the latest events (Merkle root).
    """
    last_cp = db.query(Checkpoint).order_by(Checkpoint.sequence.desc()).first()
    start_seq = last_cp.sequence if last_cp else 0
    
    events = db.query(AuditEvent).filter(AuditEvent.sequence > start_seq).order_by(AuditEvent.sequence.asc()).limit(batch_size).all()
    if not events:
        return None
        
    hashes = [e.event_hash for e in events]
    merkle_root = calculate_merkle_root(hashes)
    
    latest_seq = events[-1].sequence
    now = datetime.utcnow()
    
    # Sign the root + sequence + timestamp
    priv_key = get_signing_key()
    msg = f"{latest_seq}|{merkle_root}|{now.isoformat()}"
    signature_bytes = priv_key.sign(msg.encode('utf-8'))
    signature_hex = signature_bytes.hex()
    
    cp = Checkpoint(
        sequence=latest_seq,
        merkle_root=merkle_root,
        signature=signature_hex,
        timestamp=now
    )
    db.add(cp)
    db.flush()
    
    # Checkpoint creation itself is an audit event
    append_audit_event(
        db,
        actor_id=None,
        entity_type="CHECKPOINT",
        entity_id=str(cp.id),
        action="CHECKPOINT_SIGNED",
        payload={"sequence": latest_seq, "merkle_root": merkle_root, "signature": signature_hex}
    )
    db.commit()
    
    # Push to witness service
    import httpx
    witness_url = os.getenv("WITNESS_URL", "http://localhost:8001")
    try:
        httpx.post(
            f"{witness_url}/checkpoints",
            json={
                "sequence": latest_seq,
                "merkle_root": merkle_root,
                "signature": signature_hex,
                "timestamp": now.isoformat()
            },
            timeout=2.0
        )
    except Exception:
        pass # Best effort, do not fail transaction if witness is down
        
    return cp

def get_public_key():
    priv_key = get_signing_key()
    return priv_key.public_key()

def verify_chain(db: Session):
    events = db.query(AuditEvent).order_by(AuditEvent.sequence.asc()).all()
    prev_hash = "GENESIS"
    expected_seq = 1
    
    for event in events:
        if event.sequence != expected_seq:
            return {"valid": False, "broken_sequence": event.sequence, "reason": "Sequence mismatch"}
            
        if event.previous_hash != prev_hash:
            return {"valid": False, "broken_sequence": event.sequence, "reason": "Previous hash mismatch"}
            
        hash_input = f"{prev_hash}|{event.timestamp.isoformat()}|{event.actor_id}|{event.entity_type}|{event.entity_id}|{event.action}|{event.payload_commit}"
        expected_hash = hash_data(hash_input)
        
        if expected_hash != event.event_hash:
            return {"valid": False, "broken_sequence": event.sequence, "reason": "Event hash tampered"}
            
        prev_hash = expected_hash
        expected_seq += 1
        
    checkpoints = db.query(Checkpoint).order_by(Checkpoint.sequence.asc()).all()
    pub_key = get_public_key()
    
    for cp in checkpoints:
        msg = f"{cp.sequence}|{cp.merkle_root}|{cp.timestamp.isoformat()}"
        try:
            from cryptography.exceptions import InvalidSignature
            pub_key.verify(bytes.fromhex(cp.signature), msg.encode('utf-8'))
        except Exception:
            return {"valid": False, "broken_sequence": cp.sequence, "reason": "Invalid checkpoint signature"}
            
        prev_cp = db.query(Checkpoint).filter(Checkpoint.sequence < cp.sequence).order_by(Checkpoint.sequence.desc()).first()
        start_seq = prev_cp.sequence if prev_cp else 0
        cp_events = [e for e in events if start_seq < e.sequence <= cp.sequence]
        hashes = [e.event_hash for e in cp_events]
        expected_root = calculate_merkle_root(hashes)
        
        if expected_root != cp.merkle_root:
            return {"valid": False, "broken_sequence": cp.sequence, "reason": "Merkle root mismatch"}
            
    return {"valid": True}

def generate_proof(db: Session, target_seq: int):
    event = db.query(AuditEvent).filter(AuditEvent.sequence == target_seq).first()
    if not event:
        return None
        
    cp = db.query(Checkpoint).filter(Checkpoint.sequence >= target_seq).order_by(Checkpoint.sequence.asc()).first()
    if not cp:
        return {"event": event.event_hash, "checkpoint": None, "proof": None}
        
    prev_cp = db.query(Checkpoint).filter(Checkpoint.sequence < cp.sequence).order_by(Checkpoint.sequence.desc()).first()
    start_seq = prev_cp.sequence if prev_cp else 0
    
    events = db.query(AuditEvent).filter(
        AuditEvent.sequence > start_seq,
        AuditEvent.sequence <= cp.sequence
    ).order_by(AuditEvent.sequence.asc()).all()
    
    hashes = [e.event_hash for e in events]
    target_idx = target_seq - start_seq - 1
    
    proof = []
    current_level = hashes
    idx = target_idx
    
    while len(current_level) > 1:
        next_level = []
        for i in range(0, len(current_level), 2):
            left = current_level[i]
            right = current_level[i+1] if i+1 < len(current_level) else left
            
            if i == idx or i+1 == idx:
                sibling = right if i == idx else left
                is_left_sibling = (i+1 == idx)
                proof.append({"sibling_hash": sibling, "is_left_sibling": is_left_sibling})
                idx = i // 2
                
            next_level.append(hash_data(left + right))
        current_level = next_level
        
    return {
        "event_hash": event.event_hash,
        "checkpoint_root": cp.merkle_root,
        "checkpoint_signature": cp.signature,
        "proof_path": proof
    }
