from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from datetime import datetime

from db.database import get_db
from db.models import User, MatchRun, Candidate, Offer
from api.dependencies import RoleChecker

router = APIRouter()

@router.get("/runs/{run_id}/bundle", status_code=status.HTTP_200_OK)
def get_fhir_bundle(
    run_id: int,
    db: Session = Depends(get_db),
    user: User = Depends(RoleChecker(["ADMIN", "AUDITOR", "CLINICIAN", "COORDINATOR"]))
):
    run = db.query(MatchRun).filter(MatchRun.id == run_id).first()
    if not run:
        raise HTTPException(status_code=404, detail="Match run not found")
        
    offer = db.query(Offer).filter(Offer.id == run.offer_id).first()
    
    # Scoping
    if user.role.value not in ["ADMIN", "AUDITOR"] and offer.hospital_id != user.hospital_id:
        raise HTTPException(status_code=403, detail="Not authorized to view this match run")
        
    candidates = db.query(Candidate).filter(Candidate.match_run_id == run.id).all()
    
    # Generate read-only FHIR R4 bundle
    # using pseudonymous data only
    
    entries = []
    
    # Task resource representing the Match Run
    entries.append({
        "fullUrl": f"urn:uuid:run-{run.id}",
        "resource": {
            "resourceType": "Task",
            "id": f"run-{run.id}",
            "status": "completed",
            "intent": "order",
            "description": f"Kidney Match Run (Engine {run.engine_version})",
            "authoredOn": run.run_time.isoformat() + "Z" if run.run_time else None,
            "output": [
                {
                    "type": {
                        "text": "Output Hash"
                    },
                    "valueString": run.output_hash
                }
            ]
        }
    })
    
    # Patient resources representing the candidates
    # In FHIR, a waitlist entry / candidate can be represented by a pseudonymous Patient
    for c in candidates:
        # Get ot_id from snapshot or just use candidate id
        waitlist_snapshot = run.input_snapshot.get("waitlist", [])
        ot_id = f"pseudonymous-{c.waitlist_entry_id}"
        
        # Try to find ot_id in snapshot to be purely pseudonymous but traceable
        # We don't have the waitlist ot_id directly in Candidate, so we'll just use entry ID
        
        patient_resource = {
            "resourceType": "Patient",
            "id": f"candidate-{c.id}",
            "identifier": [
                {
                    "system": "http://organtrust.org/ot-id",
                    "value": ot_id
                }
            ],
            "active": True
        }
        
        entries.append({
            "fullUrl": f"urn:uuid:candidate-{c.id}",
            "resource": patient_resource
        })
        
        # Observation or ClinicalImpression for the match score
        impression = {
            "resourceType": "ClinicalImpression",
            "id": f"match-{c.id}",
            "status": "completed",
            "subject": {
                "reference": f"Patient/candidate-{c.id}"
            },
            "summary": "Match Result",
            "finding": [
                {
                    "itemCodeableConcept": {
                        "text": "Score"
                    },
                    "itemReference": {
                        "display": str(c.score)
                    }
                },
                {
                    "itemCodeableConcept": {
                        "text": "Excluded"
                    },
                    "itemReference": {
                        "display": str(c.excluded)
                    }
                }
            ]
        }
        
        entries.append({
            "fullUrl": f"urn:uuid:match-{c.id}",
            "resource": impression
        })
        
    bundle = {
        "resourceType": "Bundle",
        "type": "collection",
        "timestamp": datetime.utcnow().isoformat() + "Z",
        "entry": entries
    }
    
    return bundle
