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
    
    return cp
