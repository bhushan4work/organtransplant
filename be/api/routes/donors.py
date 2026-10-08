from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from db.database import get_db
from db.models import User, Person, Pseudonym, Offer
from api.dependencies import RoleChecker, get_current_user
from api.schemas.clinical import DonorCreate, OfferCreate
from core.crypto import encrypt_identity, generate_ot_id

router = APIRouter()

# Roles allowed to register donors and create offers
CLINICAL_ROLES = ["COORDINATOR", "CLINICIAN", "ADMIN"]

def check_hospital_scope(user: User, target_hospital_id: int):
    if user.role.value != "ADMIN" and user.hospital_id != target_hospital_id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Cannot perform actions outside of your assigned hospital"
        )

@router.post("/donors", status_code=status.HTTP_201_CREATED)
def register_donor(
    donor_in: DonorCreate, 
    db: Session = Depends(get_db),
    user: User = Depends(RoleChecker(CLINICAL_ROLES))
):
    check_hospital_scope(user, donor_in.hospital_id)
    
    ot_id = generate_ot_id(donor_in.identifier)
    
    # Check if pseudonym already exists
    existing_pseudo = db.query(Pseudonym).filter(Pseudonym.ot_id == ot_id).first()
    if existing_pseudo:
        return {"ot_id": ot_id, "message": "Donor already registered"}
        
    try:
        # Save to identity vault
        new_person = Person(
            encrypted_name=encrypt_identity(donor_in.name),
            encrypted_dob=encrypt_identity(donor_in.dob),
            encrypted_identifier=encrypt_identity(donor_in.identifier)
        )
        db.add(new_person)
        db.flush() # get ID without committing
        
        new_pseudo = Pseudonym(
            person_id=new_person.id,
            ot_id=ot_id
        )
        db.add(new_pseudo)
        db.commit()
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail="Failed to register donor securely")
        
    return {"ot_id": ot_id}

@router.post("/offers", status_code=status.HTTP_201_CREATED)
def create_offer(
    offer_in: OfferCreate,
    db: Session = Depends(get_db),
    user: User = Depends(RoleChecker(CLINICAL_ROLES))
):
    check_hospital_scope(user, offer_in.hospital_id)
    
    new_offer = Offer(
        ot_id=offer_in.ot_id,
        organ_type=offer_in.organ_type,
        hospital_id=offer_in.hospital_id,
        status=offer_in.status
    )
    db.add(new_offer)
    db.commit()
    db.refresh(new_offer)
    
    return {"offer_id": new_offer.id, "ot_id": new_offer.ot_id}
