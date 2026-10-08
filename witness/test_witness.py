import pytest
from fastapi.testclient import TestClient
from main import app
import os
import sqlite3

# Set in-memory db for testing witness
os.environ["WITNESS_DB_PATH"] = ":memory:"

client = TestClient(app)

def test_store_and_get_checkpoint():
    payload = {
        "sequence": 1,
        "merkle_root": "abcdef123456",
        "signature": "signature_hex_value",
        "timestamp": "2023-10-10T10:10:10"
    }
    
    # Store
    resp = client.post("/checkpoints", json=payload)
    assert resp.status_code == 201
    
    # Store duplicate
    resp2 = client.post("/checkpoints", json=payload)
    assert resp2.status_code == 400
    
    # Get
    resp3 = client.get("/checkpoints/1")
    assert resp3.status_code == 200
    assert resp3.json()["merkle_root"] == "abcdef123456"
    
    # Get missing
    resp4 = client.get("/checkpoints/99")
    assert resp4.status_code == 404
