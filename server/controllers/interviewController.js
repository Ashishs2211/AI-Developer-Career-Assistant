const {
  generateInterview,
} = require("../services/interviewService");

const startInterview = async (req, res) => {
  try {
    const { role, experience } = req.body;

    if (!role || !experience) {
      return res.status(400).json({
        success: false,
        message: "Role and experience are required.",
      });
    }

    const interview = await generateInterview(role, experience);

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