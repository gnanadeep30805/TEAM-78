const pool = require('../config/db');

const getDoctorDashboard = async (doctorId) => {
  const res = await pool.query('SELECT * FROM doctors WHERE id=$1', [doctorId]);
  return res.rows[0];
};

module.exports = { getDoctorDashboard };
