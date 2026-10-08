from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from db.database import get_db
from db.models import User, Person, Pseudonym, WaitlistEntry
from api.dependencies import RoleChecker
from api.schemas.clinical import RecipientCreate
from core.crypto import encrypt_identity, generate_ot_id
from .donors import CLINICAL_ROLES, check_hospital_scope

router = APIRouter()

@router.post("/recipients", status_code=status.HTTP_201_CREATED)
def register_recipient(
    recipient_in: RecipientCreate,
    db: Session = Depends(get_db),
    user: User = Depends(RoleChecker(CLINICAL_ROLES))
):
    check_hospital_scope(user, recipient_in.hospital_id)
    
    ot_id = generate_ot_id(recipient_in.identifier)
    
    try:
        # Check if pseudonym already exists
        existing_pseudo = db.query(Pseudonym).filter(Pseudonym.ot_id == ot_id).first()
        if not existing_pseudo:
            # Save to identity vault
            new_person = Person(
                encrypted_name=encrypt_identity(recipient_in.name),
                encrypted_dob=encrypt_identity(recipient_in.dob),
                encrypted_identifier=encrypt_identity(recipient_in.identifier)
            )
            db.add(new_person)
            db.flush()
            
            new_pseudo = Pseudonym(
                person_id=new_person.id,
                ot_id=ot_id
            )
            db.add(new_pseudo)
            db.flush()

        # Save to clinical waitlist
        waitlist_entry = WaitlistEntry(
            ot_id=ot_id,
            organ_type=recipient_in.organ_type,
            urgency_score=recipient_in.urgency_score,
            hospital_id=recipient_in.hospital_id,
            status="WAITING"
        )
        db.add(waitlist_entry)
        db.flush()
        
        from services.audit import append_audit_event
        append_audit_event(
            db,
            actor_id=user.id,
            entity_type="WAITLIST_ENTRY",
            entity_id=str(waitlist_entry.id),
            action="RECIPIENT_REGISTERED",
            payload={"ot_id": ot_id, "organ_type": recipient_in.organ_type, "hospital_id": recipient_in.hospital_id, "urgency_score": recipient_in.urgency_score}
        )
        
        db.commit()
        db.refresh(waitlist_entry)
        
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail="Failed to register recipient")
        
    return {"ot_id": ot_id, "waitlist_entry_id": waitlist_entry.id}

@router.get("/recipients", status_code=status.HTTP_200_OK)
def get_recipients(db: Session = Depends(get_db), user: User = Depends(RoleChecker(CLINICAL_ROLES))):
    entries = db.query(WaitlistEntry).all()
    from db.models import CompatibilityProfile
    result = []
    for e in entries:
        profile = db.query(CompatibilityProfile).filter(CompatibilityProfile.ot_id == e.ot_id).first()
        blood = profile.blood_type if profile else "Unknown"
        result.append({
            "id": e.id, 
            "ot_id": e.ot_id, 
            "organ_type": e.organ_type, 
            "urgency_score": e.urgency_score, 
            "status": e.status, 
            "hospital_id": e.hospital_id, 
            "blood_type": blood,
            "created_at": e.created_at.isoformat() + "Z" if e.created_at else None
        })
    return result

