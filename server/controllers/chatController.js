const {
  generateChatResponse,
} = require("../services/chatService");

const History = require("../models/History");


const chatWithAI = async (req, res) => {
  try {

    const { message } = req.body;

    if (!message || !message.trim()) {
      return res.status(400).json({
        success: false,
        message: "Message is required.",
      });
    }


    console.log(
      "Generating AI chat response..."
    );


    const reply =
      await generateChatResponse(
        message.trim()
      );


    console.log(
      "AI chat response generated successfully."
    );


    await History.create({
      user: req.user.userId,
      type: "chat",
      title: message.substring(0, 50),
      result: reply,
    });


    return res.status(200).json({
      success: true,
      reply,
    });

  } catch (error) {

    console.error(
      "CHAT CONTROLLER ERROR:",
      error.message
    );

    return res.status(
      error.status || 500
    ).json({
      success: false,
      message:
        error.message ||
        "Failed to generate AI response.",
    });
  }
};


module.exports = {
  chatWithAI,
};