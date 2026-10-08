import argparse
import random
import os
import yaml
from fastapi.testclient import TestClient

from main import app
from db.database import SessionLocal
from core.crypto import get_encryption_key # Ensure it doesn't fail
import db.models as models

def generate_data(seed: int):
    random.seed(seed)
    print(f"Starting synthetic data generation with seed={seed}...")
    
    # Initialize DB session
    db = SessionLocal()
    
    # Pre-create users directly in DB so they have exactly the known passwords and roles
    # Identity vault tables
    from core.security import get_password_hash
    
    # Create Hospitals
    h1 = models.Hospital(name="Golden Memorial Hospital", location="San Francisco, CA")
    h2 = models.Hospital(name="Silver Lining Clinic", location="Oakland, CA")
    db.add(h1)
    db.add(h2)
    db.commit()
    
    # Create Users
    admin = models.User(email="admin@organtrust.com", hashed_password=get_password_hash("admin123"), role=models.Role.ADMIN, is_active=True)
    clinician1 = models.User(email="clinician@golden.edu", hashed_password=get_password_hash("clinician123"), role=models.Role.CLINICIAN, hospital_id=h1.id, is_active=True)
    clinician2 = models.User(email="clinician@silver.edu", hashed_password=get_password_hash("clinician123"), role=models.Role.CLINICIAN, hospital_id=h2.id, is_active=True)
    lab = models.User(email="lab@golden.edu", hashed_password=get_password_hash("lab123"), role=models.Role.HLA_LAB, hospital_id=h1.id, is_active=True)
    coord = models.User(email="coord@golden.edu", hashed_password=get_password_hash("coord123"), role=models.Role.COORDINATOR, hospital_id=h1.id, is_active=True)
    auditor = models.User(email="auditor@state.gov", hashed_password=get_password_hash("auditor123"), role=models.Role.AUDITOR, is_active=True)
    
    db.add_all([admin, clinician1, clinician2, lab, coord, auditor])
    db.commit()
    
    # Now use TestClient to trigger the REST APIs (so audit ledger and crypto are perfectly generated)
    client = TestClient(app)
    
    def switch_user(email, password):
        client.post("/api/v1/auth/login", json={"email": email, "password": password})
        
    # Create Golden Policy (directly in DB to avoid building a whole endpoint for policy upload if none exists)
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
    policy = models.PolicyVersion(version="1.0", rules=policy_json, active=True)
    db.add(policy)
    db.commit()
    
    # Setup Donor
    switch_user("coord@golden.edu", "coord123")
    d_resp = client.post("/api/v1/donors", json={
        "name": "Jane Doe",
        "dob": "1980-05-15",
        "identifier": f"SYN-DONOR-{random.randint(1000, 9999)}",
        "hospital_id": h1.id,
        "organ_type": "KIDNEY"
    })
    d_ot_id = d_resp.json()["ot_id"]
    
    # Donor Lab
    switch_user("lab@golden.edu", "lab123")
    client.post(f"/api/v1/labs/{d_ot_id}", json={
        "blood_type": "O+",
        "hla_data": {
            "hla_a": ["02:01", "24:02"],
            "hla_b": ["07:02", "35:01"],
            "hla_dr": ["04:01", "15:01"],
            "pra": 0,
            "unacceptable_antigens": []
        }
    })
    
    # Offer
    switch_user("coord@golden.edu", "coord123")
    off_resp = client.post("/api/v1/offers", json={
        "ot_id": d_ot_id,
        "organ_type": "KIDNEY",
        "hospital_id": h1.id,
        "status": "AVAILABLE"
    })
    offer_id = off_resp.json()["offer_id"]
    
    # Setup Waitlist Candidates
    recipients = [
        {
            "name": "John Smith", "dob": "1975-02-20", "blood_type": "O+", "urgency": 5.0,
            "hla_a": ["02:01", "01:01"], "hla_b": ["08:01", "44:02"], "hla_dr": ["03:01", "15:01"],
            "pra": 10, "unacceptable": ["07:02"] # Will be excluded by unacceptable antigen
        },
        {
            "name": "Alice Johnson", "dob": "1990-11-10", "blood_type": "A+", "urgency": 8.5,
            "hla_a": ["02:01", "24:02"], "hla_b": ["07:02", "35:01"], "hla_dr": ["04:01", "15:01"],
            "pra": 0, "unacceptable": [] # Perfect HLA match, high urgency
        },
        {
            "name": "Bob Williams", "dob": "1965-08-05", "blood_type": "O+", "urgency": 2.0,
            "hla_a": ["01:01", "03:01"], "hla_b": ["08:01", "14:02"], "hla_dr": ["01:01", "13:01"],
            "pra": 0, "unacceptable": [], "crossmatch": "NEGATIVE"
        }
    ]
    
    for r in recipients:
        switch_user("clinician@golden.edu", "clinician123")
        r_resp = client.post("/api/v1/recipients", json={
            "name": r["name"],
            "dob": r["dob"],
            "identifier": f"SYN-REC-{random.randint(1000, 9999)}",
            "hospital_id": h1.id,
            "organ_type": "KIDNEY",
            "urgency_score": r["urgency"]
        })
        r_ot_id = r_resp.json()["ot_id"]
        
        lab_data = {
            "blood_type": r["blood_type"],
            "hla_data": {
                "hla_a": r["hla_a"],
                "hla_b": r["hla_b"],
                "hla_dr": r["hla_dr"],
                "pra": r["pra"],
                "unacceptable_antigens": r["unacceptable"]
            }
        }
        if "crossmatch" in r:
            lab_data["hla_data"]["crossmatch_status"] = r["crossmatch"]
            
        switch_user("lab@golden.edu", "lab123")
        client.post(f"/api/v1/labs/{r_ot_id}", json=lab_data)
    
    # Run the Match
    switch_user("clinician@golden.edu", "clinician123")
    match_resp = client.post(f"/api/v1/offers/{offer_id}/match")
    
    # Force a checkpoint to secure the ledger
    switch_user("admin@organtrust.com", "admin123")
    client.post("/api/v1/audit/checkpoints")
    
    db.close()
    print("Seed generation complete.")

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Generate synthetic golden seed data for OrganTrust.")
    parser.add_argument("--seed", type=int, default=42, help="Random seed for reproducibility.")
    args = parser.parse_args()
    
    # Set default keys if missing
    if not os.getenv("ENCRYPTION_KEY"):
        os.environ["ENCRYPTION_KEY"] = "12345678901234567890123456789012"
    if not os.getenv("PSEUDONYM_HMAC_KEY"):
        os.environ["PSEUDONYM_HMAC_KEY"] = "supersecrethmac"
    if not os.getenv("AUDIT_SIGNING_KEY_HEX"):
        os.environ["AUDIT_SIGNING_KEY_HEX"] = "0" * 64
        
    generate_data(args.seed)
