from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from db.database import get_db
from db.models import Offer, WaitlistEntry, MatchRun, AuditEvent, User
from api.dependencies import get_current_user

router = APIRouter()

@router.get("/")
def get_overview(db: Session = Depends(get_db), user: User = Depends(get_current_user)):
    offers_count = db.query(Offer).filter(Offer.status == "ACTIVE").count()
    recipients_count = db.query(WaitlistEntry).filter(WaitlistEntry.status == "WAITING").count()
    runs_count = db.query(MatchRun).count()
    audit_count = db.query(AuditEvent).count()
    
    recent_activity = db.query(AuditEvent).order_by(AuditEvent.timestamp.desc()).limit(5).all()
    
    return {
        "counts": {
            "offers": offers_count,
            "recipients": recipients_count,
            "runs": runs_count,
            "audit": audit_count
        },
        "recent_activity": [
            {
                "sequence": a.sequence,
                "action": a.action,
                "timestamp": a.timestamp.isoformat() + "Z" if a.timestamp else None,
                "entity_type": a.entity_type,
                "event_hash": a.event_hash
            } for a in recent_activity
        ]
    }
