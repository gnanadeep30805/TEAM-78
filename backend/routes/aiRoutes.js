const express = require('express');
const aiController = require('../controllers/aiController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// POST /api/ai/chat
router.post('/chat', authMiddleware, aiController.chat);

module.exports = router;
