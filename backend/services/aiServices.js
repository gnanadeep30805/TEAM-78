const OpenAI = require("openai");
require("dotenv").config();

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const chat = async (message) => {
  try {
    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are a medical assistant." },
        { role: "user", content: message },
      ],
      max_tokens: 500,
    });
    return response.choices[0].message.content;
  } catch (error) {
    console.error("OpenAI error:", error);
    throw new Error("AI service failed");
  }
};

module.exports = { chat };
