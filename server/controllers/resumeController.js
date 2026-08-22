const fs = require("fs");
const pdfParse = require("pdf-parse");

const { analyzeResume } = require("../services/geminiService");
const History = require("../models/History");

const uploadResume = async (req, res) => {
  try {

    /* ===============================
       CHECK FILE
    =============================== */

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please upload a PDF file",
      });
    }


    /* ===============================
       READ PDF
    =============================== */

    const fileBuffer = fs.readFileSync(
      req.file.path
    );


    /* ===============================
       EXTRACT TEXT
    =============================== */

    const pdfData =
      await pdfParse(fileBuffer);


    /* ===============================
       AI ANALYSIS
    =============================== */

    const aiResponse =
      await analyzeResume(
        pdfData.text
      );


    /* ===============================
       SAVE HISTORY
    =============================== */

    await History.create({
      user: req.user.userId,
      type: "resume",
      title: req.file.originalname,
      result: aiResponse,
    });


    /* ===============================
       DELETE TEMP FILE
    =============================== */

    if (fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }


    /* ===============================
       SUCCESS
    =============================== */

    return res.status(200).json({
      success: true,
      message:
        "Resume analyzed successfully",
      analysis: aiResponse,
    });

  } catch (error) {

    console.error(
      "========== Resume Upload Error =========="
    );

    console.error(error);
    console.error(error.stack);


    /* ===============================
       ERROR STATUS
    =============================== */

    const statusCode =
      error.status ||
      error.response?.status ||
      500;


    /* ===============================
       ERROR RESPONSE
    =============================== */

    return res.status(statusCode).json({
      success: false,
      message:
        error.message ||
        "Resume Analysis Failed",
    });
  }
};

module.exports = {
  uploadResume,
};