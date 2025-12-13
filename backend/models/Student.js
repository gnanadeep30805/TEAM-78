const pool = require('../config/db');

const getStudentDashboard = async (studentId) => {
  const res = await pool.query('SELECT * FROM students WHERE id=$1', [studentId]);
  return res.rows[0];
};

module.exports = { getStudentDashboard };
