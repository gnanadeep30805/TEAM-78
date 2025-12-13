const { addVitals } = require('../models/Vitals');

const addPatientVitals = async (req, res) => {
  try {
    const vitals = await addVitals(req.body);
    res.json(vitals);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { addPatientVitals };
