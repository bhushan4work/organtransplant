from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from datetime import datetime
import yaml

from db.database import get_db
from db.models import User, Offer, WaitlistEntry, CompatibilityProfile, PolicyVersion, MatchRun, Candidate, AuditEvent, Decision
from api.dependencies import RoleChecker, get_current_user
from api.schemas.clinical import DecisionCreate
from matching_engine.engine import run_match

router = APIRouter()

MATCH_ROLES = ["COORDINATOR", "CLINICIAN", "ADMIN"]
READ_ROLES = ["COORDINATOR", "CLINICIAN", "ADMIN", "AUDITOR"]

@router.post("/offers/{offer_id}/match", status_code=status.HTTP_201_CREATED)
def trigger_match(
    offer_id: int,
    db: Session = Depends(get_db),
    user: User = Depends(RoleChecker(MATCH_ROLES))
):
    now = datetime.utcnow()
    
    # 1. Load Offer
    offer = db.query(Offer).filter(Offer.id == offer_id).first()
    if not offer:
        raise HTTPException(status_code=404, detail="Offer not found")
        
    # Scoping
    if user.role.value != "ADMIN" and user.hospital_id != offer.hospital_id:
        raise HTTPException(status_code=403, detail="Not authorized to run match for this offer")

    # 2. Load Donor Compatibility Profile
    donor_profile = db.query(CompatibilityProfile).filter(CompatibilityProfile.ot_id == offer.ot_id).first()
    if not donor_profile:
        raise HTTPException(status_code=400, detail="Donor lab data missing")
        
    offer_dict = {
        "ot_id": offer.ot_id,
        "organ_type": offer.organ_type,
        "hospital_id": offer.hospital_id,
        "blood_type": donor_profile.blood_type,
        "hla_data": donor_profile.hla_typing
    }
    
    # 3. Load Active Policy
    policy = db.query(PolicyVersion).filter(PolicyVersion.active == True).order_by(PolicyVersion.created_at.desc()).first()
    if not policy:
        raise HTTPException(status_code=400, detail="No active policy found")
    
    # The engine expects YAML string, so we dump the DB JSON to YAML
    policy_yaml = yaml.dump(policy.rules)
    
    # 4. Load Waitlist
    waitlist_entries = db.query(WaitlistEntry).filter(
        WaitlistEntry.organ_type == offer.organ_type,
        WaitlistEntry.status == "WAITING"
    ).all()
    
    waitlist_dicts = []
    # Map waitlist entry ID to OT ID for creating candidate records later
    ot_id_to_entry_id = {}
    
    for entry in waitlist_entries:
        profile = db.query(CompatibilityProfile).filter(CompatibilityProfile.ot_id == entry.ot_id).first()
        if not profile:
            continue # Skip candidates without lab data
            
        waitlist_dicts.append({
            "ot_id": entry.ot_id,
            "hospital_id": entry.hospital_id,
            "blood_type": profile.blood_type,
            "urgency_score": entry.urgency_score,
            "listed_at": entry.created_at.isoformat(),
            "hla_data": profile.hla_typing,
            "unacceptable_antigens": profile.hla_typing.get("unacceptable_antigens", [])
        })
        ot_id_to_entry_id[entry.ot_id] = entry.id
        
    # 5. Run Pure Python Matching Engine
    try:
        match_result = run_match(offer_dict, policy_yaml, waitlist_dicts, now)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Matching engine failed: {str(e)}")

    # 6. Persist Full Run Transactionally
    try:
        snapshot = {
            "offer": offer_dict,
            "waitlist": waitlist_dicts
        }
        
        db_run = MatchRun(
            offer_id=offer.id,
            policy_version_id=policy.id,
            engine_version=match_result["engine_version"],
            policy_hash=match_result["input_hashes"]["policy"],
            offer_hash=match_result["input_hashes"]["offer"],
            waitlist_hash=match_result["input_hashes"]["waitlist"],
            output_hash=match_result["output_hash"],
            input_snapshot=snapshot,
            run_time=now
        )
        db.add(db_run)
        db.flush() # Get ID
        
        # Save valid matches
        for match in match_result["matches"]:
            db.add(Candidate(
                match_run_id=db_run.id,
                waitlist_entry_id=ot_id_to_entry_id[match["ot_id"]],
                excluded=False,
                score=match["score"],
                rank=match["rank"],
                trace_log=match["trace"]
            ))
            
        # Save excluded matches
        for excl in match_result["excluded"]:
            db.add(Candidate(
                match_run_id=db_run.id,
                waitlist_entry_id=ot_id_to_entry_id[excl["ot_id"]],
                excluded=True,
                exclusion_reason=excl["exclusion_reason"],
                score=excl["score"],
                rank=None,
                trace_log=excl["trace"]
            ))
            
        # Append to Audit Ledger
        from services.audit import append_audit_event
        append_audit_event(
            db,
            actor_id=user.id,
            entity_type="MATCH_RUN",
            entity_id=str(db_run.id),
            action="MATCH_RUN_COMPLETED",
            payload={"output_hash": match_result["output_hash"]}
        )
        
        db.commit()
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail="Database error during match persistence")
        
    return {
        "match_run_id": db_run.id,
        "engine_version": match_result["engine_version"],
        "output_hash": match_result["output_hash"],
        "total_candidates": len(match_result["matches"]),
        "total_excluded": len(match_result["excluded"])
    }

@router.get("/runs/{run_id}", status_code=status.HTTP_200_OK)
def get_match_run(
    run_id: int,
    db: Session = Depends(get_db),
    user: User = Depends(RoleChecker(READ_ROLES))
):
    run = db.query(MatchRun).filter(MatchRun.id == run_id).first()
    if not run:
        raise HTTPException(status_code=404, detail="Match run not found")
        
    offer = db.query(Offer).filter(Offer.id == run.offer_id).first()
    if user.role.value not in ["ADMIN", "AUDITOR"] and offer.hospital_id != user.hospital_id:
        raise HTTPException(status_code=403, detail="Not authorized to view this match run")
        
    candidates = db.query(Candidate).filter(Candidate.match_run_id == run.id).all()
    
    return {
        "id": run.id,
        "offer_id": run.offer_id,
        "run_time": run.run_time,
        "engine_version": run.engine_version,
        "hashes": {
            "policy": run.policy_hash,
            "offer": run.offer_hash,
            "waitlist": run.waitlist_hash,
            "output": run.output_hash
        },
        "matches": [
            {
                "candidate_id": c.id,
                "waitlist_entry_id": c.waitlist_entry_id,
                "rank": c.rank,
                "score": c.score,
                "trace": c.trace_log
            } for c in candidates if not c.excluded
        ],
        "excluded": [
            {
                "candidate_id": c.id,
                "waitlist_entry_id": c.waitlist_entry_id,
                "reason": c.exclusion_reason,
                "trace": c.trace_log
            } for c in candidates if c.excluded
        ]
    }

@router.post("/runs/{run_id}/decisions", status_code=status.HTTP_201_CREATED)
def make_decision(
    run_id: int,
    decision_in: DecisionCreate,
    db: Session = Depends(get_db),
    user: User = Depends(RoleChecker(["CLINICIAN"]))
):
    now = datetime.utcnow()
    
    # Check if run exists
    run = db.query(MatchRun).filter(MatchRun.id == run_id).first()
    if not run:
        raise HTTPException(status_code=404, detail="Match run not found")
        
    # Verify candidate was actually in this run
    candidate = db.query(Candidate).filter(
        Candidate.match_run_id == run_id,
        Candidate.waitlist_entry_id == decision_in.waitlist_entry_id
    ).first()
    if not candidate:
        raise HTTPException(status_code=404, detail="Candidate not found in this match run")
        
    # Load Waitlist Entry
    entry = db.query(WaitlistEntry).filter(WaitlistEntry.id == decision_in.waitlist_entry_id).first()
    if not entry:
        raise HTTPException(status_code=404, detail="Waitlist entry not found")
        
    # Scoping check: can this clinician decide for this waitlist entry?
    if user.role.value != "ADMIN" and entry.hospital_id != user.hospital_id:
        raise HTTPException(status_code=403, detail="Not authorized to make decisions for this patient")
        
    # Safety Gate for ACCEPT
    if decision_in.action == "ACCEPT":
        profile = db.query(CompatibilityProfile).filter(CompatibilityProfile.ot_id == entry.ot_id).first()
        if not profile:
            raise HTTPException(status_code=400, detail="Missing compatibility profile")
            
        crossmatch_status = profile.hla_typing.get("crossmatch_status")
        if crossmatch_status != "NEGATIVE":
            raise HTTPException(status_code=400, detail="Cannot accept: Crossmatch is not explicitly NEGATIVE")
            
    try:
        # Create Decision
        decision = Decision(
            match_run_id=run_id,
            waitlist_entry_id=decision_in.waitlist_entry_id,
            action=decision_in.action,
            reason_code=decision_in.reason_code,
            decided_by=user.id,
            timestamp=now
        )
        db.add(decision)
        db.flush()
        
        # Create Audit Event
        from services.audit import append_audit_event
        append_audit_event(
            db,
            actor_id=user.id,
            entity_type="DECISION",
            entity_id=str(decision.id),
            action="DECISION_MADE",
            payload={
                "run_id": run_id,
                "waitlist_entry_id": decision_in.waitlist_entry_id,
                "action": decision_in.action,
                "reason_code": decision_in.reason_code
            }
        )
        
        db.commit()
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail="Database error saving decision")
        
    return {"message": "Decision recorded successfully", "decision_id": decision.id}

@router.post("/runs/{run_id}/replay", status_code=status.HTTP_200_OK)
def replay_match(
    run_id: int,
    db: Session = Depends(get_db),
    user: User = Depends(RoleChecker(["AUDITOR", "ADMIN"]))
):
    run = db.query(MatchRun).filter(MatchRun.id == run_id).first()
    if not run:
        raise HTTPException(status_code=404, detail="Match run not found")
        
    policy = db.query(PolicyVersion).filter(PolicyVersion.id == run.policy_version_id).first()
    if not policy:
        raise HTTPException(status_code=400, detail="Policy not found")
        
    policy_yaml = yaml.dump(policy.rules)
    
    snapshot = run.input_snapshot
    offer_dict = snapshot.get("offer", {})
    waitlist_dicts = snapshot.get("waitlist", [])
    
    try:
        from matching_engine.engine import run_match
        # run.run_time is naive datetime in python if sqlite, but we might need it.
        # It's exactly the datetime used originally.
        match_result = run_match(offer_dict, policy_yaml, waitlist_dicts, run.run_time)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Replay failed to execute: {str(e)}")
        
    verified = (
        match_result["output_hash"] == run.output_hash and 
        match_result["engine_version"] == run.engine_version
    )
    
    if not verified:
        raise HTTPException(
            status_code=400, 
            detail={
                "error": "Replay verification failed",
                "expected_hash": run.output_hash,
                "actual_hash": match_result["output_hash"],
                "expected_engine": run.engine_version,
                "actual_engine": match_result["engine_version"]
            }
        )
        
    return {
        "run_id": run.id,
        "verified": verified,
        "output_hash": match_result["output_hash"],
        "engine_version": match_result["engine_version"]
    }

@router.get("/runs", status_code=status.HTTP_200_OK)
def get_runs(db: Session = Depends(get_db), user: User = Depends(RoleChecker(READ_ROLES))):
    runs = db.query(MatchRun).order_by(MatchRun.run_time.desc()).all()
    result = []
    for r in runs:
        offer = db.query(Offer).filter(Offer.id == r.offer_id).first()
        policy = db.query(PolicyVersion).filter(PolicyVersion.id == r.policy_version_id).first()
        candidates_count = db.query(Candidate).filter(Candidate.match_run_id == r.id, Candidate.excluded == False).count()
        result.append({
            "id": r.id, 
            "offer_id": r.offer_id, 
            "run_time": r.run_time.isoformat() + "Z" if r.run_time else None, 
            "engine_version": r.engine_version,
            "policy_version": policy.version if policy else "Unknown",
            "organ": offer.organ_type if offer else "Unknown",
            "eligible_candidates": candidates_count
        })
    return result
