const express = require('express');
const router = express.Router();
const { dashboard } = require('../controllers/patientController');
const { addPatientVitals } = require('../controllers/vitalsController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/dashboard', authMiddleware, dashboard);
router.post('/vitals', authMiddleware, addPatientVitals);

module.exports = router;
