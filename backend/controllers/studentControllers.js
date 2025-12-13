const { getStudentDashboard } = require('../models/Student');

const dashboard = async (req, res) => {
  try {
    const student = await getStudentDashboard(req.user.id);
    res.json(student);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { dashboard };
