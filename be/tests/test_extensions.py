import pytest
from tests.conftest import TestingSessionLocal
from db.models import MatchRun

def test_sim_match(client):
    client.post("/api/v1/auth/login", json={"email": "admin@organtrust.com", "password": "securepassword"})
    
    from tests.test_matches import setup_policy
    setup_policy()
    
    # Create Donor and Offer
    d_resp = client.post("/api/v1/donors", json={
        "name": "Sim Donor", "dob": "2000-01-01", "identifier": "SIM-D1", "hospital_id": 1, "organ_type": "KIDNEY"
    })
    d_ot_id = d_resp.json()["ot_id"]
    client.post(f"/api/v1/labs/{d_ot_id}", json={
        "blood_type": "O+", "hla_data": {"hla_a": ["01:01"], "hla_b": [], "hla_dr": [], "pra": 0, "unacceptable_antigens": []}
    })
    
    off_resp = client.post("/api/v1/offers", json={
        "ot_id": d_ot_id, "organ_type": "KIDNEY", "hospital_id": 1, "status": "AVAILABLE"
    })
    offer_id = off_resp.json()["offer_id"]
    
    # Run sim
    sim_resp = client.post("/api/v1/sim/match", json={"offer_id": offer_id})
    assert sim_resp.status_code == 200
    
    sim_data = sim_resp.json()
    assert sim_data["synthetic"] == True
    assert sim_data["status"] == "synthetic — not saved"
    
def test_fhir_bundle(client):
    client.post("/api/v1/auth/login", json={"email": "admin@organtrust.com", "password": "securepassword"})
    
    from tests.test_matches import setup_policy
    setup_policy()
    
    d_resp = client.post("/api/v1/donors", json={
        "name": "FHIR Donor", "dob": "2000-01-01", "identifier": "FHIR-D1", "hospital_id": 1, "organ_type": "KIDNEY"
    })
    d_ot_id = d_resp.json()["ot_id"]
    client.post(f"/api/v1/labs/{d_ot_id}", json={
        "blood_type": "O+", "hla_data": {"hla_a": ["01:01"], "hla_b": [], "hla_dr": [], "pra": 0, "unacceptable_antigens": []}
    })
    off_resp = client.post("/api/v1/offers", json={
        "ot_id": d_ot_id, "organ_type": "KIDNEY", "hospital_id": 1, "status": "AVAILABLE"
    })
    offer_id = off_resp.json()["offer_id"]
    
    match_resp = client.post(f"/api/v1/offers/{offer_id}/match")
    run_id = match_resp.json()["match_run_id"]
    
    fhir_resp = client.get(f"/api/v1/fhir/runs/{run_id}/bundle")
    assert fhir_resp.status_code == 200
    
    bundle = fhir_resp.json()
    assert bundle["resourceType"] == "Bundle"
    assert bundle["type"] == "collection"
    
    entries = bundle["entry"]
    assert len(entries) >= 1
    
    task_found = False
    for e in entries:
        if e["resource"]["resourceType"] == "Task":
            task_found = True
            assert e["resource"]["status"] == "completed"
            
    assert task_found
