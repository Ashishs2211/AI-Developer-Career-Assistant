const {
  generateInterview,
} = require("../services/interviewService");

const History = require("../models/History");


/* =========================================
   START MOCK INTERVIEW
========================================= */

const startInterview = async (
  req,
  res,
  next
) => {

  try {

    const {
      role,
      experience,
    } = req.body;


    /* ===============================
       VALIDATION
    =============================== */

    if (
      !role ||
      !role.trim() ||
      !experience
    ) {

      const error = new Error(
        "Role and experience are required."
      );

      error.status = 400;

      throw error;

    }


    /* ===============================
       AI GENERATION
    =============================== */

    const interview =
      await generateInterview(
        role.trim(),
        experience
      );


    /* ===============================
       SAVE HISTORY
    =============================== */

    await History.create({

      user: req.user.userId,

      type: "interview",

      title: `${role.trim()} (${experience})`,

      result: interview,

    });


    /* ===============================
       SUCCESS RESPONSE
    =============================== */

    return res.status(200).json({

      success: true,

      interview,

    });


  } catch (error) {

    /* ===============================
       SEND TO GLOBAL ERROR HANDLER
    =============================== */

    next(error);

  }

};


module.exports = {
  startInterview,
};