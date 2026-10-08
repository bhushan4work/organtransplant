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
