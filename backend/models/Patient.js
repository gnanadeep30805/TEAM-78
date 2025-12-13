const pool = require('../config/db');

const getPatientDashboard = async (patientId) => {
  const res = await pool.query('SELECT * FROM patients WHERE id=$1', [patientId]);
  return res.rows[0];
};

module.exports = { getPatientDashboard };
