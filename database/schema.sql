CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100),
  email VARCHAR(150) UNIQUE NOT NULL,
  password TEXT,
  role VARCHAR(20) CHECK (role IN ('patient','doctor','student')),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
-- Users table
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100) UNIQUE,
    password VARCHAR(255),
    role VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Doctors table
CREATE TABLE IF NOT EXISTS doctors (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id),
    specialization VARCHAR(100)
);

-- Patients table
CREATE TABLE IF NOT EXISTS patients (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id),
    age INT,
    gender VARCHAR(10)
);

-- Students table
CREATE TABLE IF NOT EXISTS students (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id),
    course VARCHAR(100)
);

-- Additional tables: consultations, vitals, etc.

CREATE TABLE otps (
  id SERIAL PRIMARY KEY,
  email VARCHAR(150),
  otp VARCHAR(6),
  expires_at TIMESTAMP
);

