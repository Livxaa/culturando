CREATE EXTENSION IF NOT EXISTS pgcrypto;

DO $$ BEGIN
  CREATE TYPE user_role AS ENUM ('buyer', 'organizer');
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE TYPE booking_status AS ENUM ('confirmed', 'cancelled');
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  role user_role NOT NULL,
  name VARCHAR(160) NOT NULL,
  email VARCHAR(254) NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  state CHAR(2),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug VARCHAR(180) NOT NULL UNIQUE,
  organizer_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(180) NOT NULL,
  category VARCHAR(100) NOT NULL DEFAULT 'Evento cultural',
  starts_at TIMESTAMPTZ NOT NULL,
  location TEXT NOT NULL,
  ticket_price NUMERIC(10, 2) NOT NULL CHECK (ticket_price >= 0),
  description TEXT NOT NULL,
  image_url TEXT,
  image_alt TEXT,
  cover_image JSONB,
  featured BOOLEAN NOT NULL DEFAULT FALSE,
  sold_out BOOLEAN NOT NULL DEFAULT FALSE,
  accessibility_groups TEXT[] NOT NULL DEFAULT '{}',
  assistive_resources TEXT[] NOT NULL DEFAULT '{}',
  onsite_support TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  buyer_id UUID REFERENCES users(id) ON DELETE SET NULL,
  event_id UUID NOT NULL REFERENCES events(id) ON DELETE RESTRICT,
  ticket_type VARCHAR(20) NOT NULL CHECK (ticket_type IN ('inteira', 'meia', 'pcd')),
  quantity INTEGER NOT NULL CHECK (quantity BETWEEN 1 AND 10),
  unit_price NUMERIC(10, 2) NOT NULL CHECK (unit_price >= 0),
  total NUMERIC(10, 2) NOT NULL CHECK (total >= 0),
  status booking_status NOT NULL DEFAULT 'confirmed',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS events_organizer_idx ON events (organizer_id);
CREATE INDEX IF NOT EXISTS events_starts_at_idx ON events (starts_at);
CREATE INDEX IF NOT EXISTS bookings_buyer_idx ON bookings (buyer_id);
CREATE INDEX IF NOT EXISTS bookings_event_idx ON bookings (event_id);

CREATE OR REPLACE FUNCTION set_updated_at() RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS users_set_updated_at ON users;
CREATE TRIGGER users_set_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION set_updated_at();
DROP TRIGGER IF EXISTS events_set_updated_at ON events;
CREATE TRIGGER events_set_updated_at BEFORE UPDATE ON events FOR EACH ROW EXECUTE FUNCTION set_updated_at();
