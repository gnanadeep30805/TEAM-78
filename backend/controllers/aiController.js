const aiService = require("../services/aiService");

// Handle AI chat requests
const chat = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: "No message provided" });
    }

    const aiResponse = await aiService.chatAI(message);
    res.json({ answer: aiResponse });

  } catch (err) {
    console.error("AI Controller Error:", err);
    res.status(500).json({ error: "AI chat failed" });
  }
};

module.exports = { chat };
