import pytest
from tests.conftest import TestingSessionLocal
from db.models import PolicyVersion

def setup_policy():
    db = TestingSessionLocal()
    # Create active policy
    policy_json = {
        "version": "1.0",
        "rules": {
            "abo_compatibility": True,
            "unacceptable_antigens": True
        },
        "points": {
            "urgency_multiplier": 1.0,
            "hla_match_max": 6.0,
            "wait_time_multiplier": 0.01,
            "local_hospital_bonus": 5.0
        }
    }
    policy = PolicyVersion(version="1.0", rules=policy_json, active=True)
    db.add(policy)
    db.commit()
    db.close()

def test_run_match_and_get_results(client):
    client.post("/api/v1/auth/login", json={"email": "admin@organtrust.com", "password": "securepassword"})
    setup_policy()
    
    # 1. Create donor
    d_resp = client.post("/api/v1/donors", json={
        "name": "Donor", "dob": "2000-01-01", "identifier": "ID-D1", "hospital_id": 1, "organ_type": "KIDNEY"
    })
    assert d_resp.status_code == 201, d_resp.text
    d_ot_id = d_resp.json()["ot_id"]
    
    # 2. Lab data for donor
    client.post(f"/api/v1/labs/{d_ot_id}", json={
        "blood_type": "O+", "hla_data": {"hla_a": ["01:01"], "hla_b": [], "hla_dr": [], "pra": 0, "unacceptable_antigens": []}
    })
    
    # 3. Create offer
    off_resp = client.post("/api/v1/offers", json={
        "ot_id": d_ot_id, "organ_type": "KIDNEY", "hospital_id": 1, "status": "AVAILABLE"
    })
    offer_id = off_resp.json()["offer_id"]
    
    # 4. Create recipient
    r_resp = client.post("/api/v1/recipients", json={
        "name": "Recip", "dob": "1990-01-01", "identifier": "ID-R1", "hospital_id": 1, "organ_type": "KIDNEY", "urgency_score": 10.0
    })
    r_ot_id = r_resp.json()["ot_id"]
    
    # 5. Lab data for recipient
    client.post(f"/api/v1/labs/{r_ot_id}", json={
        "blood_type": "A+", "hla_data": {"hla_a": ["01:01"], "hla_b": [], "hla_dr": [], "pra": 0, "unacceptable_antigens": []}
    })
    
    # 6. Run match
    match_resp = client.post(f"/api/v1/offers/{offer_id}/match")
    assert match_resp.status_code == 201
    
    run_id = match_resp.json()["match_run_id"]
    assert match_resp.json()["total_candidates"] == 1
    assert match_resp.json()["total_excluded"] == 0
    
    # 7. Get match run
    get_resp = client.get(f"/api/v1/runs/{run_id}")
    assert get_resp.status_code == 200
    assert len(get_resp.json()["matches"]) == 1
    assert get_resp.json()["matches"][0]["rank"] == 1

def test_decisions_endpoint(client):
    # Setup - assuming test_run_match_and_get_results logic
    # Or just reuse the token
    client.post("/api/v1/auth/login", json={"email": "admin@organtrust.com", "password": "securepassword"})
    setup_policy()
    
    d_resp = client.post("/api/v1/donors", json={
        "name": "Donor2", "dob": "2000-01-01", "identifier": "ID-D2", "hospital_id": 1, "organ_type": "KIDNEY"
    })
    d_ot_id = d_resp.json()["ot_id"]
    client.post(f"/api/v1/labs/{d_ot_id}", json={
        "blood_type": "O+", "hla_data": {"hla_a": ["01:01"], "hla_b": [], "hla_dr": [], "pra": 0, "unacceptable_antigens": []}
    })
    off_resp = client.post("/api/v1/offers", json={
        "ot_id": d_ot_id, "organ_type": "KIDNEY", "hospital_id": 1, "status": "AVAILABLE"
    })
    offer_id = off_resp.json()["offer_id"]
    
    r_resp = client.post("/api/v1/recipients", json={
        "name": "Recip2", "dob": "1990-01-01", "identifier": "ID-R2", "hospital_id": 1, "organ_type": "KIDNEY", "urgency_score": 20.0
    })
    r_ot_id = r_resp.json()["ot_id"]
    
    # Lab with missing crossmatch_status
    client.post(f"/api/v1/labs/{r_ot_id}", json={
        "blood_type": "A+", "hla_data": {"hla_a": ["01:01"], "hla_b": [], "hla_dr": [], "pra": 0, "unacceptable_antigens": []}
    })
    
    match_resp = client.post(f"/api/v1/offers/{offer_id}/match")
    run_id = match_resp.json()["match_run_id"]
    
    get_resp = client.get(f"/api/v1/runs/{run_id}")
    
    from tests.conftest import TestingSessionLocal
    from db.models import WaitlistEntry
    db = TestingSessionLocal()
    entry = db.query(WaitlistEntry).filter(WaitlistEntry.ot_id == r_ot_id).first()
    waitlist_entry_id = entry.id
    db.close()
    
    # Try as clinician
    client.post("/api/v1/auth/login", json={"email": "clinician@organtrust.com", "password": "securepassword"})
    
    # Should fail ACCEPT due to missing crossmatch
    dec_resp = client.post(f"/api/v1/runs/{run_id}/decisions", json={
        "waitlist_entry_id": waitlist_entry_id,
        "action": "ACCEPT",
        "reason_code": "CLINICAL_REVIEW"
    })
    assert dec_resp.status_code == 400
    assert "Crossmatch is not explicitly NEGATIVE" in dec_resp.text
    
    # Decline should work regardless of crossmatch
    dec_resp2 = client.post(f"/api/v1/runs/{run_id}/decisions", json={
        "waitlist_entry_id": waitlist_entry_id,
        "action": "DECLINE",
        "reason_code": "NOT_SUITABLE"
    })
    assert dec_resp2.status_code == 201
    
    # Now update lab with NEGATIVE crossmatch
    # Log back as HLA_LAB to update lab? Actually lab endpoint doesn't restrict yet in tests? Let's assume ADMIN can do it or we just do it as admin
    client.post("/api/v1/auth/login", json={"email": "admin@organtrust.com", "password": "securepassword"})
    client.post(f"/api/v1/labs/{r_ot_id}", json={
        "blood_type": "A+", "hla_data": {"hla_a": ["01:01"], "hla_b": [], "hla_dr": [], "pra": 0, "unacceptable_antigens": [], "crossmatch_status": "NEGATIVE"}
    })
    
    # Clinician should now be able to ACCEPT
    client.post("/api/v1/auth/login", json={"email": "clinician@organtrust.com", "password": "securepassword"})
    dec_resp3 = client.post(f"/api/v1/runs/{run_id}/decisions", json={
        "waitlist_entry_id": waitlist_entry_id,
        "action": "ACCEPT",
        "reason_code": "CLINICAL_REVIEW_PASS"
    })
    assert dec_resp3.status_code == 201

