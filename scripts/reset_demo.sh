#!/usr/bin/env bash
set -e

cd "$(dirname "$0")/../be"

if [ -f .env ]; then
  export $(cat .env | grep -v '#' | xargs)
fi

source venv/bin/activate

echo "Cleaning database..."
python -c "
import sqlalchemy as sa
from core.config import settings
from db.database import engine

with engine.connect() as conn:
    conn.execute(sa.text('DROP SCHEMA IF EXISTS identity_vault CASCADE'))
    conn.execute(sa.text('DROP SCHEMA IF EXISTS clinical CASCADE'))
    conn.execute(sa.text('DROP SCHEMA IF EXISTS matching CASCADE'))
    conn.execute(sa.text('DROP SCHEMA IF EXISTS audit CASCADE'))
    conn.execute(sa.text('DROP TABLE IF EXISTS alembic_version CASCADE'))
    conn.execute(sa.text('DROP TYPE IF EXISTS role CASCADE'))
    conn.execute(sa.text('DROP TYPE IF EXISTS bloodtype CASCADE'))
    conn.execute(sa.text('DROP TYPE IF EXISTS decisionaction CASCADE'))
    conn.execute(sa.text('DROP TYPE IF EXISTS offerstatus CASCADE'))
    conn.commit()
"

echo "Applying migrations..."
alembic upgrade head

echo "Seeding golden data..."
python -m seed.generate --seed 42

echo "Demo reset complete!"
