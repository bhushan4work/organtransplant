import pytest
from fastapi.testclient import TestClient
import uuid
import time
import jwt

from main import app
from core.config import settings

client = TestClient(app, base_url="http://testserver")

def login(email, password):
    resp = client.post("/api/v1/auth/login", json={"email": email, "password": password})
    assert resp.status_code in [200, 201], resp.text
    return resp

def test_full_flow():
    # 1. Login
    login("admin@organtrust.com", "admin123")
    
    # Check invalid input
    login_fail = client.post("/api/v1/auth/login", json={"email": "admin@organtrust.com", "password": "wrong"})
    assert login_fail.status_code == 401
    
    # 2. Registration (Donor)
    login("coord@golden.edu", "coord123")
    donor_resp = client.post("/api/v1/donors", json={
        "name": "Invalid DOB",
        "dob": "not-a-date",
        "identifier": "SYN-DONOR-9999",
        "hospital_id": 1,
        "organ_type": "KIDNEY"
    })
    # Invalid input check
    assert donor_resp.status_code == 422 # Pydantic validation error

    donor_resp = client.post("/api/v1/donors", json={
        "name": "Real Donor",
        "dob": "1990-01-01",
        "identifier": f"SYN-DONOR-{uuid.uuid4().hex[:6]}",
        "hospital_id": 1,
        "organ_type": "KIDNEY"
    })
    assert donor_resp.status_code in [200, 201]
    d_ot_id = donor_resp.json()["ot_id"]

    # Role restriction: Coord cannot create labs
    lab_resp = client.post(f"/api/v1/labs/{d_ot_id}", json={
        "blood_type": "O+",
        "hla_data": {"hla_a": [], "hla_b": [], "hla_dr": [], "pra": 0, "unacceptable_antigens": []}
    })
    assert lab_resp.status_code == 403

    # Lab data
    login("lab@golden.edu", "lab123")
    lab_resp = client.post(f"/api/v1/labs/{d_ot_id}", json={
        "blood_type": "O+",
        "hla_data": {"hla_a": ["02:01"], "hla_b": [], "hla_dr": [], "pra": 0, "unacceptable_antigens": []}
    })
    assert lab_resp.status_code in [200, 201]
    
    # Offer
    login("coord@golden.edu", "coord123")
    offer_resp = client.post("/api/v1/offers", json={
        "ot_id": d_ot_id,
        "organ_type": "KIDNEY",
        "hospital_id": 1,
        "status": "AVAILABLE"
    })
    assert offer_resp.status_code in [200, 201], offer_resp.text
    offer_id = offer_resp.json()["offer_id"]

    # Match
    login("clinician@golden.edu", "clinician123")
    match_resp = client.post(f"/api/v1/offers/{offer_id}/match")
    assert match_resp.status_code in [200, 201], match_resp.text
    
    run_id = match_resp.json()["match_run_id"]
    
    # Explanation
    runs_resp = client.get(f"/api/v1/runs/{run_id}")
    assert runs_resp.status_code in [200, 201]
    run_data = runs_resp.json()
    assert "matches" in run_data
    run_id = run_data["id"]

    # Hospital Isolation Check
    login("clinician@silver.edu", "clinician123") # Hospital 2
    # Trying to access Hospital 1's run
    bad_offer = client.get(f"/api/v1/runs/{run_id}")
    assert bad_offer.status_code in [403, 404]

    # Clinician Decision
    login("clinician@golden.edu", "clinician123")
    waitlist_id = run_data["matches"][0]["waitlist_entry_id"]
    dec_resp = client.post(f"/api/v1/runs/{run_id}/decisions", json={
        "waitlist_entry_id": waitlist_id,
        "action": "DECLINE",
        "reason_code": "POSITIVE_CROSSMATCH"
    })
    assert dec_resp.status_code in [200, 201], dec_resp.text

    # Audit Event Checkpoint
    login("admin@organtrust.com", "admin123")
    cp_resp = client.post("/api/v1/audit/checkpoints")
    assert cp_resp.status_code in [200, 201]

    # Auditor Verify
    login("auditor@state.gov", "auditor123")
    verify_resp = client.get("/api/v1/audit/verify")
    assert verify_resp.status_code in [200, 201]
    
    # Replay
    replay_resp = client.post(f"/api/v1/runs/{run_id}/replay")
    assert replay_resp.status_code in [200, 201]
    assert replay_resp.json()["verified"] is True

    # Expired session check
    # Generate expired token
    expired_token = jwt.encode(
        {"sub": str(1), "role": "ADMIN", "exp": time.time() - 3600},
        settings.SECRET_KEY, algorithm=settings.ALGORITHM
    )
    client.cookies.set("access_token", expired_token)
    exp_resp = client.get("/api/v1/auth/me")
    assert exp_resp.status_code == 401

