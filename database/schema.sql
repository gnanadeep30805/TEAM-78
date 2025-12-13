CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100),
  email VARCHAR(150) UNIQUE NOT NULL,
  password TEXT,
  role VARCHAR(20) CHECK (role IN ('patient','doctor','student')),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE otps (
  id SERIAL PRIMARY KEY,
  email VARCHAR(150),
  otp VARCHAR(6),
  expires_at TIMESTAMP
);
