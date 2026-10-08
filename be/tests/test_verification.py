import pytest
from sqlalchemy import text
from db.models import AuditEvent, Checkpoint, MatchRun
from tests.conftest import TestingSessionLocal
import os
import yaml
from datetime import datetime

def setup_data_for_tests(client):
    db = TestingSessionLocal()
    db.execute(text("DELETE FROM audit_events"))
    db.execute(text("DELETE FROM checkpoints"))
    db.execute(text("DELETE FROM match_runs"))
    db.commit()
    db.close()
    
    os.environ["AUDIT_SIGNING_KEY_HEX"] = "0" * 64
    client.post("/api/v1/auth/login", json={"email": "admin@organtrust.com", "password": "securepassword"})
    
    # 1. Trigger something that creates an audit event
    d_resp = client.post("/api/v1/donors", json={
        "name": "Audit Donor", "dob": "1990-01-01", "identifier": "AUDIT-002", "hospital_id": 1, "organ_type": "KIDNEY"
    })
    
    # 2. Trigger checkpoint
    cp_resp = client.post("/api/v1/audit/checkpoints")

def test_clean_verification_and_proof(client):
    setup_data_for_tests(client)
    
    client.post("/api/v1/auth/login", json={"email": "admin@organtrust.com", "password": "securepassword"})
    verify_resp = client.get("/api/v1/audit/verify")
    assert verify_resp.status_code == 200
    assert verify_resp.json()["valid"] == True
    
    proof_resp = client.get("/api/v1/audit/proof/1")
    assert proof_resp.status_code == 200
    assert "proof_path" in proof_resp.json()

def test_tampered_payload_verification(client):
    setup_data_for_tests(client)
    db = TestingSessionLocal()
    event = db.query(AuditEvent).filter(AuditEvent.sequence == 1).first()
    
    # Bypass our own append-only protection by using raw SQL
    db.execute(
        text("UPDATE audit_events SET payload_commit = 'HACKED' WHERE sequence = :seq"),
        {"seq": event.sequence}
    )
    db.commit()
    db.close()
    
    client.post("/api/v1/auth/login", json={"email": "admin@organtrust.com", "password": "securepassword"})
    verify_resp = client.get("/api/v1/audit/verify")
    assert verify_resp.status_code == 400
    assert verify_resp.json()["detail"]["valid"] == False
    assert verify_resp.json()["detail"]["reason"] == "Event hash tampered"

def test_rewritten_chain_verification(client):
    setup_data_for_tests(client)
    db = TestingSessionLocal()
    
    db.execute(
        text("UPDATE audit_events SET previous_hash = 'BROKEN' WHERE sequence = 2")
    )
    db.commit()
    db.close()
    
    client.post("/api/v1/auth/login", json={"email": "admin@organtrust.com", "password": "securepassword"})
    verify_resp = client.get("/api/v1/audit/verify")
    assert verify_resp.status_code == 400
    assert verify_resp.json()["detail"]["reason"] == "Previous hash mismatch"

def test_invalid_signature_verification(client):
    setup_data_for_tests(client)
    db = TestingSessionLocal()
    
    db.execute(
        text("UPDATE checkpoints SET signature = '000000000000'")
    )
    db.commit()
    db.close()
    
    client.post("/api/v1/auth/login", json={"email": "admin@organtrust.com", "password": "securepassword"})
    verify_resp = client.get("/api/v1/audit/verify")
    assert verify_resp.status_code == 400
    assert verify_resp.json()["detail"]["reason"] == "Invalid checkpoint signature"

def test_replay(client):
    client.post("/api/v1/auth/login", json={"email": "admin@organtrust.com", "password": "securepassword"})
    
    from tests.test_matches import setup_policy
    setup_policy()
    
    # We must run a match
    d_resp = client.post("/api/v1/donors", json={
        "name": "Replay Donor", "dob": "2000-01-01", "identifier": "REPLAY-D1", "hospital_id": 1, "organ_type": "KIDNEY"
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
    
    # Test Replay
    replay_resp = client.post(f"/api/v1/runs/{run_id}/replay")
    assert replay_resp.status_code == 200
    assert replay_resp.json()["verified"] == True

    # Test tampering the input snapshot to cause failure
    db = TestingSessionLocal()
    # using raw sql because SQLAlchemy JSON objects can be tricky with partial updates in tests
    db.execute(
        text("UPDATE match_runs SET engine_version = '9.9.9' WHERE id = :id"),
        {"id": run_id}
    )
    db.commit()
    db.close()
    
    replay_resp2 = client.post(f"/api/v1/runs/{run_id}/replay")
    assert replay_resp2.status_code == 400
    assert "Replay verification failed" in replay_resp2.text

