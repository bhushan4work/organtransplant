import pytest
from db.models import AuditEvent, Checkpoint
from tests.conftest import TestingSessionLocal
import os

def test_audit_flow(client):
    # Setup test env for signature
    os.environ["AUDIT_SIGNING_KEY_HEX"] = "0" * 64
    client.post("/api/v1/auth/login", json={"email": "admin@organtrust.com", "password": "securepassword"})
    
    # 1. Trigger something that creates an audit event
    # Using donor registration
    d_resp = client.post("/api/v1/donors", json={
        "name": "Audit Donor", "dob": "1990-01-01", "identifier": "AUDIT-001", "hospital_id": 1, "organ_type": "KIDNEY"
    })
    assert d_resp.status_code == 201
    
    # Check that audit event was created
    db = TestingSessionLocal()
    events = db.query(AuditEvent).all()
    # At least LOGIN and DONOR_REGISTERED
    assert len(events) >= 2
    
    last_event = db.query(AuditEvent).order_by(AuditEvent.sequence.desc()).first()
    assert last_event.action == "DONOR_REGISTERED"
    assert last_event.previous_hash != "GENESIS"
    
    # 2. Prevent updates/deletes
    import pytest
    with pytest.raises(Exception):
        last_event.action = "HACKED"
        db.commit()
    
    db.rollback()
        
    with pytest.raises(Exception):
        db.delete(last_event)
        db.commit()
        
    db.rollback()
    
    # 3. Trigger checkpoint
    cp_resp = client.post("/api/v1/audit/checkpoints")
    assert cp_resp.status_code == 201
    assert "merkle_root" in cp_resp.json()
    
    db.close()
