from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from db.database import get_db
from db.models import User, Person, Pseudonym
from api.dependencies import RoleChecker
from services.audit import create_checkpoint, append_audit_event
from core.crypto import decrypt_identity

router = APIRouter()

@router.post("/checkpoints", status_code=status.HTTP_201_CREATED)
def trigger_checkpoint(
    db: Session = Depends(get_db),
    user: User = Depends(RoleChecker(["AUDITOR", "ADMIN"]))
):
    cp = create_checkpoint(db)
    if not cp:
        return {"message": "No new events to checkpoint"}
    return {"message": "Checkpoint created", "sequence": cp.sequence, "merkle_root": cp.merkle_root}

@router.get("/identity/{ot_id}", status_code=status.HTTP_200_OK)
def read_identity(
    ot_id: str,
    db: Session = Depends(get_db),
    user: User = Depends(RoleChecker(["CLINICIAN", "COORDINATOR", "ADMIN"]))
):
    pseudo = db.query(Pseudonym).filter(Pseudonym.ot_id == ot_id).first()
    if not pseudo:
        raise HTTPException(status_code=404, detail="Identity not found")
        
    person = db.query(Person).filter(Person.id == pseudo.person_id).first()
    if not person:
        raise HTTPException(status_code=404, detail="Person not found")
        
    # Append Audit Event BEFORE returning the sensitive data
    append_audit_event(
        db,
        actor_id=user.id,
        entity_type="IDENTITY",
        entity_id=ot_id,
        action="IDENTITY_READ",
        payload={"reason": "CLINICAL_VIEW"}
    )
    db.commit()
    
    return {
        "ot_id": ot_id,
        "name": decrypt_identity(person.encrypted_name),
        "dob": decrypt_identity(person.encrypted_dob),
        "identifier": decrypt_identity(person.encrypted_identifier)
    }

from services.audit import verify_chain, generate_proof

@router.get("/verify", status_code=status.HTTP_200_OK)
def verify_audit_ledger(db: Session = Depends(get_db)):
    result = verify_chain(db)
    if not result["valid"]:
        raise HTTPException(status_code=400, detail=result)
    return result

@router.get("/proof/{seq}", status_code=status.HTTP_200_OK)
def get_inclusion_proof(seq: int, db: Session = Depends(get_db)):
    proof = generate_proof(db, seq)
    if not proof:
        raise HTTPException(status_code=404, detail="Event not found")
    return proof

from db.models import AuditEvent
@router.get("/events", status_code=status.HTTP_200_OK)
def get_audit_events(db: Session = Depends(get_db), user: User = Depends(RoleChecker(["AUDITOR", "ADMIN"]))):
    events = db.query(AuditEvent).order_by(AuditEvent.sequence.desc()).limit(100).all()
    return [{"sequence": e.sequence, "timestamp": e.timestamp.isoformat() + "Z" if e.timestamp else None, "actor_id": e.actor_id, "entity_type": e.entity_type, "entity_id": e.entity_id, "action": e.action, "event_hash": e.event_hash} for e in events]
