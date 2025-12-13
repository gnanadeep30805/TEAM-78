const express = require('express');
const router = express.Router();
const { dashboard } = require('../controllers/studentController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/dashboard', authMiddleware, dashboard);

module.exports = router;
