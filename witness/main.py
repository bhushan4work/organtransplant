from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import sqlite3
import os

app = FastAPI(title="OrganTrust Witness Service")

# Setup SQLite database for the witness service
DB_PATH = os.getenv("WITNESS_DB_PATH", "witness.db")

def init_db():
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS signed_checkpoints (
            sequence INTEGER PRIMARY KEY,
            merkle_root TEXT NOT NULL,
            signature TEXT NOT NULL,
            timestamp TEXT NOT NULL
        )
    ''')
    conn.commit()
    conn.close()

init_db()

class CheckpointPayload(BaseModel):
    sequence: int
    merkle_root: str
    signature: str
    timestamp: str

@app.post("/checkpoints", status_code=201)
def store_checkpoint(payload: CheckpointPayload):
    try:
        conn = sqlite3.connect(DB_PATH)
        cursor = conn.cursor()
        cursor.execute(
            "INSERT INTO signed_checkpoints (sequence, merkle_root, signature, timestamp) VALUES (?, ?, ?, ?)",
            (payload.sequence, payload.merkle_root, payload.signature, payload.timestamp)
        )
        conn.commit()
        conn.close()
        return {"message": "Checkpoint stored"}
    except sqlite3.IntegrityError:
        conn.close()
        raise HTTPException(status_code=400, detail="Checkpoint for this sequence already exists")
    except Exception as e:
        conn.close()
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/checkpoints/{sequence}")
def get_checkpoint(sequence: int):
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    cursor.execute("SELECT sequence, merkle_root, signature, timestamp FROM signed_checkpoints WHERE sequence = ?", (sequence,))
    row = cursor.fetchone()
    conn.close()
    
    if not row:
        raise HTTPException(status_code=404, detail="Checkpoint not found")
        
    return {
        "sequence": row[0],
        "merkle_root": row[1],
        "signature": row[2],
        "timestamp": row[3]
    }
