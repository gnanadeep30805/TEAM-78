const pool = require('../config/db');
const bcrypt = require('bcryptjs');

const createUser = async ({ name, email, password, role }) => {
  const hashed = await bcrypt.hash(password, 10);
  const query = 'INSERT INTO users(name,email,password,role) VALUES($1,$2,$3,$4) RETURNING *';
  const values = [name, email, hashed, role];
  const res = await pool.query(query, values);
  return res.rows[0];
};

const findUserByEmail = async (email) => {
  const res = await pool.query('SELECT * FROM users WHERE email=$1', [email]);
  return res.rows[0];
};

module.exports = { createUser, findUserByEmail };
