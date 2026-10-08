import sys
from fastapi.testclient import TestClient
from main import app
from db.database import SessionLocal

db = SessionLocal()
client = TestClient(app)

client.post("/api/v1/auth/login", json={"email": "coord@golden.edu", "password": "coord123"})
d_resp = client.post("/api/v1/donors", json={
    "name": "Jane Doe",
    "dob": "1980-05-15",
    "identifier": "SYN-DONOR-1234",
    "hospital_id": 1,
    "organ_type": "KIDNEY"
})
print(d_resp.status_code)
print(d_resp.text)
