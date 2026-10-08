from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from datetime import datetime
from copy import deepcopy
import yaml
from pydantic import BaseModel

from db.database import get_db
from db.models import User, Offer, CompatibilityProfile, PolicyVersion, WaitlistEntry
from api.dependencies import RoleChecker
from matching_engine.engine import run_match

router = APIRouter()

class SimMatchRequest(BaseModel):
    offer_id: int

@router.post("/match", status_code=status.HTTP_200_OK)
def simulate_match(
    req: SimMatchRequest,
    db: Session = Depends(get_db),
    user: User = Depends(RoleChecker(["ADMIN", "CLINICIAN", "COORDINATOR"]))
):
    now = datetime.utcnow()
    
    # 1. Load Offer
    offer = db.query(Offer).filter(Offer.id == req.offer_id).first()
    if not offer:
        raise HTTPException(status_code=404, detail="Offer not found")
        
    # 2. Load Donor Compatibility Profile
    donor_profile = db.query(CompatibilityProfile).filter(CompatibilityProfile.ot_id == offer.ot_id).first()
    if not donor_profile:
        raise HTTPException(status_code=400, detail="Donor lab data missing")
        
    offer_dict = {
        "ot_id": f"SIM-{offer.ot_id}",
        "organ_type": offer.organ_type,
        "hospital_id": offer.hospital_id,
        "blood_type": donor_profile.blood_type,
        "hla_data": donor_profile.hla_typing
    }
    
    # 3. Load Active Policy
    policy = db.query(PolicyVersion).filter(PolicyVersion.active == True).order_by(PolicyVersion.created_at.desc()).first()
    if not policy:
        raise HTTPException(status_code=400, detail="No active policy found")
    
    policy_yaml = yaml.dump(policy.rules)
    
    # 4. Load Waitlist
    waitlist_entries = db.query(WaitlistEntry).filter(
        WaitlistEntry.organ_type == offer.organ_type,
        WaitlistEntry.status == "ACTIVE"
    ).all()
    
    waitlist_dicts = []
    for w in waitlist_entries:
        p_profile = db.query(CompatibilityProfile).filter(CompatibilityProfile.ot_id == w.ot_id).first()
        if not p_profile:
            continue
            
        waitlist_dicts.append({
            "ot_id": f"SIM-{w.ot_id}",
            "hospital_id": w.hospital_id,
            "urgency_status": w.urgency_status,
            "blood_type": p_profile.blood_type,
            "hla_data": p_profile.hla_typing,
            "listed_at": w.listed_at
        })
        
    # Operate on copied synthetic inputs
    synth_offer = deepcopy(offer_dict)
    synth_waitlist = deepcopy(waitlist_dicts)
    
    # Run the match
    try:
        match_result = run_match(synth_offer, policy_yaml, synth_waitlist, now)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Engine error: {str(e)}")
        
    # Return without saving, and clearly mark as synthetic
    return {
        "status": "synthetic — not saved",
        "synthetic": True,
        "engine_version": match_result["engine_version"],
        "output_hash": match_result["output_hash"],
        "total_candidates": len(match_result["matches"]),
        "total_excluded": len(match_result["excluded"]),
        "matches": match_result["matches"],
        "excluded": match_result["excluded"]
    }
