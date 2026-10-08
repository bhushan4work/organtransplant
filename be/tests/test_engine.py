import pytest
from datetime import datetime
import copy
import random
from matching_engine.engine import run_match, InvalidPolicyError

POLICY_YAML = """
version: "1.0"
rules:
  abo_compatibility: true
  unacceptable_antigens: true
points:
  urgency_multiplier: 1.0
  hla_match_max: 6.0
  wait_time_multiplier: 0.01
  local_hospital_bonus: 5.0
"""

OFFER = {
    "ot_id": "OT-DONOR1",
    "organ_type": "KIDNEY",
    "hospital_id": 1,
    "blood_type": "O",
    "hla_data": {
        "hla_a": ["01:01", "02:01"],
        "hla_b": ["07:02", "08:01"],
        "hla_dr": ["03:01", "04:01"]
    }
}

WAITLIST = [
    {
        "ot_id": "OT-REC1",
        "hospital_id": 1,
        "blood_type": "O",
        "urgency_score": 5.0,
        "listed_at": "2023-01-01T12:00:00",
        "hla_data": {
            "hla_a": ["01:01", "02:01"],
            "hla_b": ["07:02", "08:01"],
            "hla_dr": ["03:01", "04:01"]
        },
        "unacceptable_antigens": []
    },
    {
        "ot_id": "OT-REC2",
        "hospital_id": 2,
        "blood_type": "A",
        "urgency_score": 10.0,
        "listed_at": "2023-06-01T12:00:00",
        "hla_data": {
            "hla_a": ["01:01", "03:01"],
            "hla_b": ["07:02", "08:01"],
            "hla_dr": ["03:01", "04:01"]
        },
        "unacceptable_antigens": ["02:01"] # Donor has 02:01, should fail
    },
    {
        "ot_id": "OT-REC3",
        "hospital_id": 2,
        "blood_type": "B",
        "urgency_score": 2.0,
        "listed_at": "2022-01-01T12:00:00",
        "hla_data": {
            "hla_a": ["11:01", "24:02"],
            "hla_b": ["07:02", "08:01"],
            "hla_dr": ["03:01", "04:01"]
        },
        "unacceptable_antigens": []
    }
]

NOW = datetime(2023, 10, 1, 12, 0, 0)

def test_golden_match():
    # Test expected behavior with fixed inputs
    result = run_match(OFFER, POLICY_YAML, WAITLIST, NOW)
    
    assert result["engine_version"] == "1.0.0"
    
    matches = result["matches"]
    excluded = result["excluded"]
    
    assert len(matches) == 2
    assert len(excluded) == 1
    
    # OT-REC2 should be excluded because of unacceptable antigens
    assert excluded[0]["ot_id"] == "OT-REC2"
    assert excluded[0]["exclusion_reason"] == "UNACCEPTABLE_ANTIGEN"
    
    # Rank 1 should be OT-REC1 (Perfect HLA match + Local hospital bonus + Urgency + Wait time)
    assert matches[0]["ot_id"] == "OT-REC1"
    assert matches[0]["rank"] == 1
    
    # Check trace includes S04 local bonus
    traces = [t["rule_id"] for t in matches[0]["trace"]]
    assert "S04" in traces
    
    assert matches[1]["ot_id"] == "OT-REC3"
    assert matches[1]["rank"] == 2

def test_shuffle_invariance():
    # Shuffling waitlist should produce exactly identical output hash and match ordering
    w1 = copy.deepcopy(WAITLIST)
    w2 = copy.deepcopy(WAITLIST)
    
    random.shuffle(w1)
    random.shuffle(w2)
    
    # Make sure they are actually differently ordered in memory
    assert w1 != w2 or len(w1) < 2
    
    res1 = run_match(OFFER, POLICY_YAML, w1, NOW)
    res2 = run_match(OFFER, POLICY_YAML, w2, NOW)
    
    # Outputs MUST exactly match regardless of input list order because output is deterministically sorted
    # Input hashes will differ because waitlist hash includes order, but output matches should be identical
    assert res1["matches"] == res2["matches"]
    assert res1["output_hash"] == res2["output_hash"]

def test_determinism():
    # Multiple runs with exact same inputs produce exact same output hash
    res1 = run_match(OFFER, POLICY_YAML, WAITLIST, NOW)
    res2 = run_match(OFFER, POLICY_YAML, WAITLIST, NOW)
    
    assert res1["output_hash"] == res2["output_hash"]
    assert res1["input_hashes"] == res2["input_hashes"]

def test_invalid_policy():
    invalid_yaml = "this is not valid policy\n - { broken"
    with pytest.raises(InvalidPolicyError):
        run_match(OFFER, invalid_yaml, WAITLIST, NOW)
        
    invalid_schema = "version: '1.0'\nmissing_points: true"
    with pytest.raises(InvalidPolicyError):
        run_match(OFFER, invalid_schema, WAITLIST, NOW)
