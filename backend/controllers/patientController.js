const { getPatientDashboard } = require('../models/Patient');

const dashboard = async (req, res) => {
  try {
    const patient = await getPatientDashboard(req.user.id);
    res.json(patient);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { dashboard };
