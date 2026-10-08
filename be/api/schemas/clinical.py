from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import datetime

class IdentityBase(BaseModel):
    name: str = Field(..., min_length=1)
    dob: str = Field(..., description="YYYY-MM-DD")
    identifier: str = Field(..., min_length=4)
    hospital_id: int

class DonorCreate(IdentityBase):
    organ_type: str

class OfferCreate(BaseModel):
    ot_id: str
    organ_type: str
    hospital_id: int
    status: str = "AVAILABLE"

class RecipientCreate(IdentityBase):
    organ_type: str
    urgency_score: float

class HLATyping(BaseModel):
    hla_a: List[str]
    hla_b: List[str]
    hla_dr: List[str]
    pra: float = Field(..., ge=0, le=100)
    unacceptable_antigens: List[str] = []
    crossmatch_status: Optional[str] = None
    tested_at: datetime = Field(default_factory=datetime.utcnow)

class LabDataCreate(BaseModel):
    blood_type: str = Field(..., description="ABO Blood Type")
    hla_data: HLATyping
