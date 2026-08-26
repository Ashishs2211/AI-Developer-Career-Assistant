const {
  generateCareerRoadmap,
} = require("../services/roadmapService");

const History = require("../models/History");


/* =========================================
   GENERATE ROADMAP CONTROLLER
========================================= */

const generateRoadmap = async (req, res) => {

  try {

    const {
      goal,
      level,
    } = req.body;


    /* ===============================
       VALIDATION
    =============================== */

    if (!goal || !level) {

      return res.status(400).json({
        success: false,
        message:
          "Goal and level are required.",
      });
    }


    /* ===============================
       GENERATE AI ROADMAP
    =============================== */

    const roadmap =
      await generateCareerRoadmap(
        goal,
        level
      );


    /* ===============================
       SAVE HISTORY
    =============================== */

    await History.create({

      user: req.user.userId,

      type: "roadmap",

      title: `${goal} (${level})`,

      result: roadmap,

    });


    /* ===============================
       SUCCESS RESPONSE
    =============================== */

    return res.status(200).json({

      success: true,

      roadmap,

    });


  } catch (error) {

    console.error(
      "========== ROADMAP CONTROLLER ERROR =========="
    );

    console.error(
      "Status:",
      error?.status
    );

    console.error(
      "Message:",
      error?.message
    );

    console.error(
      error?.stack
    );

    console.error(
      "=============================================="
    );


    const statusCode =
      error?.status || 500;


    return res.status(statusCode).json({

      success: false,

      message:
        error?.message ||
        "Roadmap generation failed.",

    });
  }
};


module.exports = {
  generateRoadmap,
};