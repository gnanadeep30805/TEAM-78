const { createConsultation } = require('../models/Consultation');

const addConsultation = async (req, res) => {
  try {
    const consultation = await createConsultation(req.body);
    res.json(consultation);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { addConsultation };
