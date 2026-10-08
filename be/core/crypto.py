import os
import hmac
import hashlib
from cryptography.hazmat.primitives.ciphers.aead import AESGCM
from core.config import settings
import base64

def get_encryption_key() -> bytes:
    key = settings.ENCRYPTION_KEY.encode('utf-8')
    # AES-256 requires exactly 32 bytes
    if len(key) != 32:
        raise ValueError("ENCRYPTION_KEY must be exactly 32 bytes")
    return key

def encrypt_identity(data: str) -> str:
    if not data:
        return ""
    key = get_encryption_key()
    aesgcm = AESGCM(key)
    nonce = os.urandom(12) # GCM standard nonce size is 12 bytes
    ciphertext = aesgcm.encrypt(nonce, data.encode('utf-8'), None)
    return base64.b64encode(nonce + ciphertext).decode('utf-8')

def decrypt_identity(encrypted_data: str) -> str:
    if not encrypted_data:
        return ""
    try:
        raw_data = base64.b64decode(encrypted_data.encode('utf-8'))
        nonce = raw_data[:12]
        ciphertext = raw_data[12:]
        key = get_encryption_key()
        aesgcm = AESGCM(key)
        plaintext = aesgcm.decrypt(nonce, ciphertext, None)
        return plaintext.decode('utf-8')
    except Exception as e:
        raise ValueError(f"Decryption failed: {str(e)}")

def generate_ot_id(identifier: str) -> str:
    """Generate a stable OT-ID for a given string (e.g. SSN or National ID) using HMAC-SHA256"""
    hmac_key = settings.PSEUDONYM_HMAC_KEY.encode('utf-8')
    h = hmac.new(hmac_key, identifier.encode('utf-8'), hashlib.sha256)
    return f"OT-{h.hexdigest()[:16].upper()}"
