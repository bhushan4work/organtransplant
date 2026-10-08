from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from db.database import get_db
from db.models import User, CompatibilityProfile
from api.dependencies import RoleChecker
from api.schemas.clinical import LabDataCreate
from core.crypto import generate_ot_id

router = APIRouter()

LAB_ROLES = ["HLA_LAB", "ADMIN"]

@router.post("/labs/{ot_id}", status_code=status.HTTP_201_CREATED)
def submit_lab_data(
    ot_id: str,
    lab_data: LabDataCreate,
    db: Session = Depends(get_db),
    user: User = Depends(RoleChecker(LAB_ROLES))
):
    # Depending on strictness, we might want to verify if the hospital_id of the patient
    # matches the lab's hospital_id, but OT_ID obscures that. In a real scenario,
    # the lab might receive an order ID tied to the OT_ID and Hospital.
    # For now, we trust HLA_LAB role to submit data for a given ot_id.
    
    # Store complex HLA data as JSON
    hla_json = lab_data.hla_data.model_dump()
    # Need to convert datetime to string if pydantic v2 doesn't do it for model_dump inside JSON column
    hla_json['tested_at'] = hla_json['tested_at'].isoformat()
    
    try:
        profile = db.query(CompatibilityProfile).filter(CompatibilityProfile.ot_id == ot_id).first()
        if profile:
            profile.blood_type = lab_data.blood_type
            profile.hla_typing = hla_json
        else:
            profile = CompatibilityProfile(
                ot_id=ot_id,
                blood_type=lab_data.blood_type,
                hla_typing=hla_json
            )
            db.add(profile)
            
        db.flush()
        
        from services.audit import append_audit_event
        append_audit_event(
            db,
            actor_id=user.id,
            entity_type="LAB_DATA",
            entity_id=str(profile.id),
            action="LAB_RESULT_ENTERED",
            payload={"ot_id": ot_id, "blood_type": lab_data.blood_type}
        )
        
        db.commit()
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail="Failed to save lab data")

    return {"message": "Lab data successfully saved", "ot_id": ot_id}
