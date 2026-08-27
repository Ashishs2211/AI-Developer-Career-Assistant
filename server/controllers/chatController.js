const {
  generateChatResponse,
} = require("../services/chatService");

const History = require("../models/History");


/* =========================================
   CHAT WITH AI
========================================= */

const chatWithAI = async (
  req,
  res,
  next
) => {

  try {

    const { message } = req.body;


    /* ===============================
       VALIDATION
    =============================== */

    if (!message || !message.trim()) {

      const error = new Error(
        "Message is required."
      );

      error.status = 400;

      throw error;

    }


    /* ===============================
       GENERATE AI RESPONSE
    =============================== */

    const reply =
      await generateChatResponse(
        message.trim()
      );


    /* ===============================
       SAVE HISTORY
    =============================== */

    await History.create({

      user: req.user.userId,

      type: "chat",

      title: message
        .trim()
        .substring(0, 50),

      result: reply,

    });


    /* ===============================
       SUCCESS RESPONSE
    =============================== */

    return res.status(200).json({

      success: true,

      reply,

    });


  } catch (error) {

    /* ===============================
       SEND ERROR TO GLOBAL HANDLER
    =============================== */

    next(error);

  }

};


module.exports = {
  chatWithAI,
};