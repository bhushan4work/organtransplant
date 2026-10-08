import yaml
import hashlib
import json
from datetime import datetime
from typing import Dict, Any, List

ENGINE_VERSION = "1.0.0"

class InvalidPolicyError(Exception):
    pass

def hash_data(data: Any) -> str:
    """Returns SHA-256 hash of a canonically JSON-encoded python object."""
    encoded = json.dumps(data, sort_keys=True, default=str).encode('utf-8')
    return hashlib.sha256(encoded).hexdigest()

def check_abo_compatibility(donor_abo: str, recipient_abo: str, policy: Dict) -> bool:
    if not policy.get("rules", {}).get("abo_compatibility", True):
        return True
    
    # Clean up strings
    donor_abo = donor_abo.replace("+", "").replace("-", "").upper()
    recipient_abo = recipient_abo.replace("+", "").replace("-", "").upper()
    
    compatibility = {
        "O": ["O", "A", "B", "AB"],
        "A": ["A", "AB"],
        "B": ["B", "AB"],
        "AB": ["AB"]
    }
    
    allowed = compatibility.get(donor_abo, [])
    return recipient_abo in allowed

def check_unacceptable_antigens(donor_hla: Dict, recipient_unacceptable: List[str], policy: Dict) -> bool:
    if not policy.get("rules", {}).get("unacceptable_antigens", True):
        return True
        
    donor_antigens = set(donor_hla.get('hla_a', []) + donor_hla.get('hla_b', []) + donor_hla.get('hla_dr', []))
    recipient_ua_set = set(recipient_unacceptable)
    
    # Intersection must be empty
    return len(donor_antigens.intersection(recipient_ua_set)) == 0

def calculate_hla_mismatch(donor_hla: Dict, recipient_hla: Dict) -> int:
    mismatches = 0
    for locus in ['hla_a', 'hla_b', 'hla_dr']:
        d_alleles = set(donor_hla.get(locus, []))
        r_alleles = set(recipient_hla.get(locus, []))
        # For a standard locus with 2 alleles, mismatch is alleles in donor not in recipient
        mismatches += len(d_alleles - r_alleles)
    return mismatches

def run_match(offer: Dict, policy_yaml: str, waitlist: List[Dict], now: datetime) -> Dict:
    # 1. Parse and validate Policy
    try:
        policy = yaml.safe_load(policy_yaml)
    except yaml.YAMLError as e:
        raise InvalidPolicyError(f"Invalid YAML policy: {str(e)}")
        
    if not isinstance(policy, dict) or 'version' not in policy or 'points' not in policy:
        raise InvalidPolicyError("Policy must be a dict and contain 'version' and 'points'")
        
    # 2. Hash Inputs for Provenance
    policy_hash = hash_data(policy)
    offer_hash = hash_data(offer)
    waitlist_hash = hash_data(waitlist)
    
    results = []
    
    for candidate in waitlist:
        trace = []
        score = 0.0
        excluded = False
        reason = ""
        
        # Hard Rule 1: ABO Compatibility
        if not check_abo_compatibility(offer.get("blood_type", "O"), candidate.get("blood_type", "A"), policy):
            excluded = True
            reason = "ABO_INCOMPATIBLE"
            trace.append({"rule_id": "R01", "result": "FAIL", "explanation": "ABO Incompatible"})
        else:
            trace.append({"rule_id": "R01", "result": "PASS", "explanation": "ABO Compatible"})
            
        # Hard Rule 2: Unacceptable Antigens
        if not excluded:
            if not check_unacceptable_antigens(offer.get("hla_data", {}), candidate.get("unacceptable_antigens", []), policy):
                excluded = True
                reason = "UNACCEPTABLE_ANTIGEN"
                trace.append({"rule_id": "R02", "result": "FAIL", "explanation": "Donor has unacceptable antigen for recipient"})
            else:
                trace.append({"rule_id": "R02", "result": "PASS", "explanation": "No unacceptable antigens present"})
        
        # Scoring
        if not excluded:
            # 1. Urgency Points
            urgency = candidate.get("urgency_score", 0.0)
            u_pts = urgency * policy["points"].get("urgency_multiplier", 1.0)
            score += u_pts
            trace.append({"rule_id": "S01", "points": u_pts, "explanation": f"Urgency score multiplier applied: {u_pts}"})
            
            # 2. HLA Match Points (Max 6 minus mismatches)
            mismatches = calculate_hla_mismatch(offer.get("hla_data", {}), candidate.get("hla_data", {}))
            max_hla = policy["points"].get("hla_match_max", 6)
            hla_pts = max(0, max_hla - mismatches)
            score += hla_pts
            trace.append({"rule_id": "S02", "points": hla_pts, "explanation": f"HLA Match points: {hla_pts} (Mismatches: {mismatches})"})
            
            # 3. Wait Time Points
            listed_str = candidate.get("listed_at")
            if listed_str:
                listed_at = datetime.fromisoformat(listed_str) if isinstance(listed_str, str) else listed_str
                days_waiting = (now - listed_at).days
                wait_pts = max(0, days_waiting) * policy["points"].get("wait_time_multiplier", 0.1)
                score += wait_pts
                trace.append({"rule_id": "S03", "points": wait_pts, "explanation": f"Wait time points: {wait_pts} for {days_waiting} days"})
                
            # 4. Geography Tier (Simplified matching hospital_id)
            if offer.get("hospital_id") == candidate.get("hospital_id"):
                geo_pts = policy["points"].get("local_hospital_bonus", 5.0)
                score += geo_pts
                trace.append({"rule_id": "S04", "points": geo_pts, "explanation": f"Local hospital bonus: {geo_pts}"})

        # Add to results
        results.append({
            "ot_id": candidate["ot_id"],
            "excluded": excluded,
            "exclusion_reason": reason,
            "score": score,
            "trace": trace,
            "listed_at": candidate.get("listed_at", "")
        })
        
    # Filter out excluded and deterministically sort
    valid_matches = [r for r in results if not r["excluded"]]
    
    # Deterministic Sort:
    # 1. Score (Descending)
    # 2. Listed_at (Ascending - earlier is better)
    # 3. OT_ID (Lexicographical - absolute tiebreaker)
    valid_matches.sort(
        key=lambda x: (
            -x["score"], 
            x["listed_at"] if x["listed_at"] else "9999-12-31T23:59:59", 
            x["ot_id"]
        )
    )
    
    # Assign Ranks
    for i, match in enumerate(valid_matches):
        match["rank"] = i + 1

    # Output Hash
    output_hash = hash_data(valid_matches)
    
    return {
        "engine_version": ENGINE_VERSION,
        "input_hashes": {
            "policy": policy_hash,
            "offer": offer_hash,
            "waitlist": waitlist_hash
        },
        "output_hash": output_hash,
        "matches": valid_matches,
        "excluded": [r for r in results if r["excluded"]]
    }
