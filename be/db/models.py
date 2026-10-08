from sqlalchemy import Column, Integer, String, Boolean, ForeignKey, DateTime, Float, Enum
from sqlalchemy.orm import relationship
from datetime import datetime
import enum
from db.database import Base

class BloodType(str, enum.Enum):
    A_PLUS = "A+"
    A_MINUS = "A-"
    B_PLUS = "B+"
    B_MINUS = "B-"
    AB_PLUS = "AB+"
    AB_MINUS = "AB-"
    O_PLUS = "O+"
    O_MINUS = "O-"

class OrganType(str, enum.Enum):
    KIDNEY = "KIDNEY"
    LIVER = "LIVER"
    HEART = "HEART"
    LUNG = "LUNG"
    PANCREAS = "PANCREAS"

class MatchStatus(str, enum.Enum):
    PENDING = "PENDING"
    ACCEPTED = "ACCEPTED"
    REJECTED = "REJECTED"
    COMPLETED = "COMPLETED"

class PatientStatus(str, enum.Enum):
    WAITING = "WAITING"
    MATCHED = "MATCHED"
    TRANSPLANTED = "TRANSPLANTED"
    DECEASED = "DECEASED"

class Hospital(Base):
    __tablename__ = "hospitals"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True, nullable=False)
    location = Column(String, nullable=False)
    contact_email = Column(String, unique=True, index=True, nullable=False)

    donors = relationship("Donor", back_populates="hospital")
    recipients = relationship("Recipient", back_populates="hospital")

class Donor(Base):
    __tablename__ = "donors"

    id = Column(Integer, primary_key=True, index=True)
    hospital_id = Column(Integer, ForeignKey("hospitals.id"))
    
    organ_type = Column(Enum(OrganType), nullable=False)
    blood_type = Column(Enum(BloodType), nullable=False)
    hla_type = Column(String, nullable=False) # Simplified HLA representation
    
    status = Column(Enum(PatientStatus), default=PatientStatus.WAITING)
    registered_at = Column(DateTime, default=datetime.utcnow)

    hospital = relationship("Hospital", back_populates="donors")
    matches = relationship("Match", back_populates="donor")

class Recipient(Base):
    __tablename__ = "recipients"

    id = Column(Integer, primary_key=True, index=True)
    hospital_id = Column(Integer, ForeignKey("hospitals.id"))
    
    organ_type = Column(Enum(OrganType), nullable=False)
    blood_type = Column(Enum(BloodType), nullable=False)
    hla_type = Column(String, nullable=False)
    
    urgency_score = Column(Float, nullable=False) # e.g., MELD score for liver
    
    status = Column(Enum(PatientStatus), default=PatientStatus.WAITING)
    registered_at = Column(DateTime, default=datetime.utcnow)

    hospital = relationship("Hospital", back_populates="recipients")
    matches = relationship("Match", back_populates="recipient")

class Match(Base):
    __tablename__ = "matches"

    id = Column(Integer, primary_key=True, index=True)
    donor_id = Column(Integer, ForeignKey("donors.id"))
    recipient_id = Column(Integer, ForeignKey("recipients.id"))
    
    match_score = Column(Float, nullable=False)
    status = Column(Enum(MatchStatus), default=MatchStatus.PENDING)
    
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    donor = relationship("Donor", back_populates="matches")
    recipient = relationship("Recipient", back_populates="matches")

class LedgerEntry(Base):
    __tablename__ = "ledger"
    
    id = Column(Integer, primary_key=True, index=True)
    entity_type = Column(String, nullable=False) # e.g., "MATCH", "DONOR"
    entity_id = Column(Integer, nullable=False)
    action = Column(String, nullable=False) # e.g., "CREATED", "STATUS_CHANGED"
    
    timestamp = Column(DateTime, default=datetime.utcnow)
    payload_hash = Column(String, nullable=False) # cryptographic hash of the data for trust

class Role(str, enum.Enum):
    COORDINATOR = "COORDINATOR"
    CLINICIAN = "CLINICIAN"
    HLA_LAB = "HLA_LAB"
    AUDITOR = "AUDITOR"
    ADMIN = "ADMIN"

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    role = Column(Enum(Role), nullable=False)
    hospital_id = Column(Integer, ForeignKey("hospitals.id"), nullable=True) # None for Admin/Auditor
    is_active = Column(Boolean, default=True)

    hospital = relationship("Hospital")

class TokenBlocklist(Base):
    __tablename__ = "token_blocklist"

    id = Column(Integer, primary_key=True, index=True)
    jti = Column(String, unique=True, index=True, nullable=False)
    revoked_at = Column(DateTime, default=datetime.utcnow)
