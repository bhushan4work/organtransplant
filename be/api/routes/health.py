from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import text
from db.database import get_db

router = APIRouter()

@router.get("/")
def health_check(db: Session = Depends(get_db)):
    # Check DB connectivity
    try:
        db.execute(text("SELECT 1"))
        db_status = "ok"
    except Exception as e:
        db_status = str(e)

    return {
        "status": "ok",
        "database": db_status
    }
