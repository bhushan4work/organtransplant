import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.pool import StaticPool
import uuid

from main import app
from db.database import get_db, Base
from core.security import get_password_hash
from db.models import User, Role

# Setup in-memory SQLite for testing
SQLALCHEMY_DATABASE_URL = "sqlite:///:memory:"

engine = create_engine(
    SQLALCHEMY_DATABASE_URL,
    connect_args={"check_same_thread": False},
    poolclass=StaticPool,
)
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

def override_get_db():
    try:
        db = TestingSessionLocal()
        yield db
    finally:
        db.close()

app.dependency_overrides[get_db] = override_get_db

@pytest.fixture(scope="module")
def setup_db():
    # SQLite doesn't support schemas in the same way, clear them for tests
    for table in Base.metadata.tables.values():
        table.schema = None
    Base.metadata.create_all(bind=engine)
    db = TestingSessionLocal()
    
    # Create test user
    user = User(
        email="admin@organtrust.com",
        hashed_password=get_password_hash("securepassword"),
        role=Role.ADMIN,
        is_active=True
    )
    db.add(user)
    db.commit()
    
    yield
    Base.metadata.drop_all(bind=engine)

@pytest.fixture(scope="module")
def client(setup_db):
    with TestClient(app, base_url="https://testserver") as c:
        yield c
