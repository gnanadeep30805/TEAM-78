const pool = require('../config/db');

const addVitals = async ({ patientId, temperature, heartRate, bp }) => {
  const res = await pool.query(
    'INSERT INTO vitals(patient_id, temperature, heart_rate, bp) VALUES($1,$2,$3,$4) RETURNING *',
    [patientId, temperature, heartRate, bp]
  );
  return res.rows[0];
};

module.exports = { addVitals };
