#!/usr/bin/env bash
set -e

# Move to backend directory
cd "$(dirname "$0")/../be"

# Ensure environment variables are loaded if using a .env (optional step, typically export them)
if [ -f .env ]; then
  export $(cat .env | grep -v '#' | xargs)
fi

source venv/bin/activate

echo "Cleaning database..."
# Run a python one-liner to drop schemas
python -c "
import sqlalchemy as sa
from core.config import settings
from db.database import engine

with engine.connect() as conn:
    conn.execute(sa.text('DROP SCHEMA IF EXISTS identity_vault CASCADE'))
    conn.execute(sa.text('DROP SCHEMA IF EXISTS clinical CASCADE'))
    conn.execute(sa.text('DROP SCHEMA IF EXISTS matching CASCADE'))
    conn.execute(sa.text('DROP SCHEMA IF EXISTS audit CASCADE'))
    conn.commit()
"

echo "Applying migrations..."
alembic upgrade head

echo "Seeding golden data..."
python -m seed.generate --seed 42

echo "Demo reset complete!"
