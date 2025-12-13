const express = require('express');
const router = express.Router();
const { dashboard } = require('../controllers/doctorController');
const { addConsultation } = require('../controllers/consultationController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/dashboard', authMiddleware, dashboard);
router.post('/consultation', authMiddleware, addConsultation);

module.exports = router;
