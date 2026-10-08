from typing import Optional
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    PROJECT_NAME: str = "OrganTrust Backend"
    API_V1_STR: str = "/api/v1"

    # Preferred: single connection string (e.g. Neon PostgreSQL)
    DATABASE_URL: Optional[str] = None

    # Fallback: individual connection components (local dev)
    POSTGRES_SERVER: str = "localhost"
    POSTGRES_USER: str = "postgres"
    POSTGRES_PASSWORD: str = "postgres"
    POSTGRES_DB: str = "organtrust"
    POSTGRES_PORT: str = "5432"

    SECRET_KEY: str = "09d25e094faa6ca2556c818166b7a9563b93f7099f6f0f4caa6cf63b88e8d3e7" # replace in prod
    ENCRYPTION_KEY: str = "12345678901234567890123456789012" # 32 bytes for AES-256
    PSEUDONYM_HMAC_KEY: str = "12345678901234567890123456789012"
    SIGNING_KEY: str = "12345678901234567890123456789012"
    AUDIT_SIGNING_KEY_HEX: str = "1234567890123456789012345678901234567890123456789012345678901234"

    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    REFRESH_TOKEN_EXPIRE_DAYS: int = 7

    @property
    def SQLALCHEMY_DATABASE_URI(self) -> str:
        if self.DATABASE_URL:
            # Neon (and most cloud providers) use postgres:// scheme; SQLAlchemy needs postgresql+psycopg2://
            url = self.DATABASE_URL.replace("postgres://", "postgresql+psycopg2://", 1)
            if url.startswith("postgresql://"):
                url = url.replace("postgresql://", "postgresql+psycopg2://", 1)
            return url
        return (
            f"postgresql+psycopg2://{self.POSTGRES_USER}:{self.POSTGRES_PASSWORD}"
            f"@{self.POSTGRES_SERVER}:{self.POSTGRES_PORT}/{self.POSTGRES_DB}"
        )

    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"

settings = Settings()
