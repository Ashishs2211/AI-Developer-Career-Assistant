const {
  generateInterview,
} = require("../services/interviewService");

const History = require("../models/History");

const startInterview = async (req, res) => {
  try {
    const { role, experience } = req.body;

    if (!role || !experience) {
      return res.status(400).json({
        success: false,
        message: "Role and experience are required.",
      });
    }

    // Generate AI Interview
    const interview = await generateInterview(role, experience);

    // Save History
    await History.create({
      user: req.user.userId,
      type: "interview",
      title: `${role} (${experience})`,
      result: interview,
    });

    res.status(200).json({
      success: true,
      interview,
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
  startInterview,
};