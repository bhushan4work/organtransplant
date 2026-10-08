def test_create_donor(client):
    # First login as CLINICIAN
    client.post(
        "/api/v1/auth/login",
        json={"email": "admin@organtrust.com", "password": "securepassword"}
    )
    
    # We need to assume the admin user has hospital_id=1, or bypass hospital check since it's ADMIN
    # In conftest.py, we created the admin user with hospital_id=None, and Role=ADMIN
    # The check_hospital_scope allows ADMIN.
    
    donor_data = {
        "name": "John Doe",
        "dob": "1980-01-01",
        "identifier": "SSN-1234",
        "hospital_id": 1,
        "organ_type": "KIDNEY"
    }
    
    response = client.post("/api/v1/donors", json=donor_data)
    assert response.status_code == 201
    assert "ot_id" in response.json()
    
    ot_id = response.json()["ot_id"]
    
    # Now create an offer
    offer_data = {
        "ot_id": ot_id,
        "organ_type": "KIDNEY",
        "hospital_id": 1,
        "status": "AVAILABLE"
    }
    offer_resp = client.post("/api/v1/offers", json=offer_data)
    assert offer_resp.status_code == 201
    assert "offer_id" in offer_resp.json()

def test_create_recipient(client):
    client.post(
        "/api/v1/auth/login",
        json={"email": "admin@organtrust.com", "password": "securepassword"}
    )
    
    recipient_data = {
        "name": "Jane Smith",
        "dob": "1990-05-10",
        "identifier": "SSN-5678",
        "hospital_id": 1,
        "organ_type": "KIDNEY",
        "urgency_score": 9.5
    }
    
    response = client.post("/api/v1/recipients", json=recipient_data)
    assert response.status_code == 201
    assert "waitlist_entry_id" in response.json()
    assert "ot_id" in response.json()
    
    ot_id = response.json()["ot_id"]
    
    # Submit lab data
    lab_data = {
        "blood_type": "O-",
        "hla_data": {
            "hla_a": ["01:01", "02:01"],
            "hla_b": ["07:02", "08:01"],
            "hla_dr": ["03:01", "04:01"],
            "pra": 15.5,
            "unacceptable_antigens": ["02:01"],
            "crossmatch_status": "NEGATIVE"
        }
    }
    
    lab_resp = client.post(f"/api/v1/labs/{ot_id}", json=lab_data)
    assert lab_resp.status_code == 201
    assert lab_resp.json()["message"] == "Lab data successfully saved"
