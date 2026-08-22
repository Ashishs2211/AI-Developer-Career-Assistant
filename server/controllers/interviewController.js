const {
  generateInterview,
} = require("../services/interviewService");

const History = require("../models/History");

const startInterview = async (req, res) => {
  try {
    const {
      role,
      experience,
    } = req.body;

    /* ================= VALIDATION ================= */

    if (!role || !experience) {
      return res.status(400).json({
        success: false,
        message:
          "Role and experience are required.",
      });
    }

    /* ================= AI GENERATION ================= */

    const interview =
      await generateInterview(
        role,
        experience
      );

    /* ================= SAVE HISTORY ================= */

    await History.create({
      user: req.user.userId,
      type: "interview",
      title: `${role} (${experience})`,
      result: interview,
    });

    /* ================= SUCCESS ================= */

    return res.status(200).json({
      success: true,
      interview,
    });

  } catch (error) {

    console.error(
      "Interview Controller Error:",
      error
    );

    const statusCode =
      error.status || 500;

    return res.status(statusCode).json({
      success: false,
      message:
        error.message ||
        "Interview Generation Failed",
    });
  }
};

module.exports = {
  startInterview,
};