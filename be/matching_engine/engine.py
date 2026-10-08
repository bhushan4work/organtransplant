from typing import List, Dict, Any

class MatchingEngine:
    def __init__(self):
        # We could load HLA matching tables or rules here
        pass
        
    def check_blood_type_compatibility(self, donor_blood: str, recipient_blood: str) -> bool:
        # Simplified blood type compatibility (O- is universal donor, AB+ is universal recipient, etc)
        # For a hackathon, we can do a simplified exact match or a basic matrix
        compatibility = {
            "O-": ["O-", "O+", "A-", "A+", "B-", "B+", "AB-", "AB+"],
            "O+": ["O+", "A+", "B+", "AB+"],
            "A-": ["A-", "A+", "AB-", "AB+"],
            "A+": ["A+", "AB+"],
            "B-": ["B-", "B+", "AB-", "AB+"],
            "B+": ["B+", "AB+"],
            "AB-": ["AB-", "AB+"],
            "AB+": ["AB+"]
        }
        return recipient_blood in compatibility.get(donor_blood, [])

    def calculate_score(self, donor: Dict[str, Any], recipient: Dict[str, Any]) -> float:
        score = 0.0
        
        # 1. Blood type compatibility is mandatory
        if not self.check_blood_type_compatibility(donor['blood_type'], recipient['blood_type']):
            return 0.0
            
        # 2. HLA matching (simplified string match for now)
        if donor['hla_type'] == recipient['hla_type']:
            score += 50.0
            
        # 3. Urgency score of recipient increases match weight
        score += recipient.get('urgency_score', 0.0) * 2.0
        
        return score

    def find_matches(self, donors: List[Dict[str, Any]], recipients: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
        """
        Pure function: Takes standard data structures, returns matches.
        No database dependencies.
        """
        matches = []
        
        for donor in donors:
            for recipient in recipients:
                # Must be the same organ type
                if donor['organ_type'] != recipient['organ_type']:
                    continue
                    
                score = self.calculate_score(donor, recipient)
                if score > 0:
                    matches.append({
                        "donor_id": donor['id'],
                        "recipient_id": recipient['id'],
                        "score": score
                    })
                    
        # Sort matches by score descending
        matches.sort(key=lambda x: x['score'], reverse=True)
        return matches
