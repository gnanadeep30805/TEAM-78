const { getDoctorDashboard } = require('../models/Doctor');

const dashboard = async (req, res) => {
  try {
    const doctor = await getDoctorDashboard(req.user.id);
    res.json(doctor);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { dashboard };
