from sqlalchemy import Column, Integer, String, Boolean, ForeignKey, DateTime, Float, Enum, JSON, Text
from sqlalchemy.orm import relationship, declarative_base
from datetime import datetime
import enum
from db.database import Base

class Role(str, enum.Enum):
    COORDINATOR = "COORDINATOR"
    CLINICIAN = "CLINICIAN"
    HLA_LAB = "HLA_LAB"
    AUDITOR = "AUDITOR"
    ADMIN = "ADMIN"

# ==========================================
# IDENTITY VAULT SCHEMA
# ==========================================
class Hospital(Base):
    __tablename__ = "hospitals"
    __table_args__ = {'schema': 'identity_vault'}
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    location = Column(String)

class User(Base):
    __tablename__ = "users"
    __table_args__ = {'schema': 'identity_vault'}
    
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    role = Column(Enum(Role), nullable=False)
    hospital_id = Column(Integer, ForeignKey("identity_vault.hospitals.id"), nullable=True)
    is_active = Column(Boolean, default=True)

class TokenBlocklist(Base):
    __tablename__ = "token_blocklist"
    __table_args__ = {'schema': 'identity_vault'}
    
    id = Column(Integer, primary_key=True, index=True)
    jti = Column(String, unique=True, index=True, nullable=False)
    revoked_at = Column(DateTime, default=datetime.utcnow)

class Person(Base):
    __tablename__ = "persons"
    __table_args__ = {'schema': 'identity_vault'}
    
    id = Column(Integer, primary_key=True, index=True)
    encrypted_name = Column(String, nullable=False) 
    encrypted_dob = Column(String, nullable=False)
    encrypted_identifier = Column(String, nullable=False) # e.g. SSN

class Pseudonym(Base):
    __tablename__ = "pseudonyms"
    __table_args__ = {'schema': 'identity_vault'}
    
    id = Column(Integer, primary_key=True, index=True)
    person_id = Column(Integer, ForeignKey("identity_vault.persons.id"), nullable=False)
    ot_id = Column(String, unique=True, index=True, nullable=False) # Stable OT-ID generated via HMAC

# ==========================================
# CLINICAL SCHEMA
# ==========================================
class Offer(Base):
    __tablename__ = "offers"
    __table_args__ = {'schema': 'clinical'}
    
    id = Column(Integer, primary_key=True, index=True)
    ot_id = Column(String, index=True, nullable=False)
    organ_type = Column(String, nullable=False)
    hospital_id = Column(Integer, ForeignKey("identity_vault.hospitals.id"), nullable=False)
    status = Column(String, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)

class WaitlistEntry(Base):
    __tablename__ = "waitlist_entries"
    __table_args__ = {'schema': 'clinical'}
    
    id = Column(Integer, primary_key=True, index=True)
    ot_id = Column(String, index=True, nullable=False)
    organ_type = Column(String, nullable=False)
    urgency_score = Column(Float, nullable=False)
    hospital_id = Column(Integer, ForeignKey("identity_vault.hospitals.id"), nullable=False)
    status = Column(String, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)

class CompatibilityProfile(Base):
    __tablename__ = "compatibility_profiles"
    __table_args__ = {'schema': 'clinical'}
    
    id = Column(Integer, primary_key=True, index=True)
    ot_id = Column(String, unique=True, index=True, nullable=False)
    blood_type = Column(String, nullable=False)
    hla_typing = Column(JSON, nullable=False) 

# ==========================================
# MATCHING SCHEMA
# ==========================================
class PolicyVersion(Base):
    __tablename__ = "policy_versions"
    __table_args__ = {'schema': 'matching'}
    
    id = Column(Integer, primary_key=True, index=True)
    version = Column(String, nullable=False)
    rules = Column(JSON, nullable=False)
    active = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.utcnow)

class MatchRun(Base):
    __tablename__ = "match_runs"
    __table_args__ = {'schema': 'matching'}
    
    id = Column(Integer, primary_key=True, index=True)
    offer_id = Column(Integer, ForeignKey("clinical.offers.id"), nullable=False)
    policy_version_id = Column(Integer, ForeignKey("matching.policy_versions.id"), nullable=False)
    
    engine_version = Column(String, nullable=False)
    policy_hash = Column(String, nullable=False)
    offer_hash = Column(String, nullable=False)
    waitlist_hash = Column(String, nullable=False)
    output_hash = Column(String, nullable=False)
    
    input_snapshot = Column(JSON, nullable=False)
    run_time = Column(DateTime, default=datetime.utcnow)
    
    candidates = relationship("Candidate", back_populates="match_run")

class Candidate(Base):
    __tablename__ = "candidates"
    __table_args__ = {'schema': 'matching'}
    
    id = Column(Integer, primary_key=True, index=True)
    match_run_id = Column(Integer, ForeignKey("matching.match_runs.id"), nullable=False)
    waitlist_entry_id = Column(Integer, ForeignKey("clinical.waitlist_entries.id"), nullable=False)
    
    excluded = Column(Boolean, default=False)
    exclusion_reason = Column(String, nullable=True)
    score = Column(Float, nullable=False)
    rank = Column(Integer, nullable=True)
    trace_log = Column(JSON, nullable=False)
    
    match_run = relationship("MatchRun", back_populates="candidates")

class Decision(Base):
    __tablename__ = "decisions"
    __table_args__ = {'schema': 'matching'}
    
    id = Column(Integer, primary_key=True, index=True)
    candidate_id = Column(Integer, ForeignKey("matching.candidates.id"), nullable=False)
    status = Column(String, nullable=False) 
    reason = Column(String, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

# ==========================================
# AUDIT SCHEMA
# ==========================================
class AuditEvent(Base):
    __tablename__ = "audit_events"
    __table_args__ = {'schema': 'audit'}
    
    id = Column(Integer, primary_key=True, index=True)
    entity_type = Column(String, nullable=False)
    entity_id = Column(String, nullable=False)
    action = Column(String, nullable=False)
    actor_id = Column(Integer, nullable=False)
    timestamp = Column(DateTime, default=datetime.utcnow)
    payload_hash = Column(String, nullable=False)

class Checkpoint(Base):
    __tablename__ = "checkpoints"
    __table_args__ = {'schema': 'audit'}
    
    id = Column(Integer, primary_key=True, index=True)
    hash_value = Column(String, nullable=False)
    timestamp = Column(DateTime, default=datetime.utcnow)
