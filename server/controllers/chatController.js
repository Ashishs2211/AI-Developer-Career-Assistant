const { generateChatResponse } = require("../services/chatService");
const History = require("../models/History");

const chatWithAI = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({
        success: false,
        message: "Message is required.",
      });
    }

    const reply = await generateChatResponse(message);

    await History.create({
      user: req.user.userId,
      type: "chat",
      title: message.substring(0, 50),
      result: reply,
    });

    res.status(200).json({
      success: true,
      reply,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  chatWithAI,
};