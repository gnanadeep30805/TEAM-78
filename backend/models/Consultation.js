const pool = require('../config/db');

const createConsultation = async ({ doctorId, patientId, notes }) => {
  const res = await pool.query(
    'INSERT INTO consultations(doctor_id, patient_id, notes) VALUES($1,$2,$3) RETURNING *',
    [doctorId, patientId, notes]
  );
  return res.rows[0];
};

module.exports = { createConsultation };
