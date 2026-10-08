from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from db.database import get_db
from db.models import PolicyVersion, User
from api.dependencies import get_current_user

router = APIRouter()

@router.get("/")
def get_policies(db: Session = Depends(get_db), user: User = Depends(get_current_user)):
    policies = db.query(PolicyVersion).order_by(PolicyVersion.created_at.desc()).all()
    return [{"id": p.id, "version": p.version, "active": p.active, "created_at": p.created_at.isoformat() + "Z" if p.created_at else None, "rules": p.rules} for p in policies]
