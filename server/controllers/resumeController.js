const fs = require("fs");
const pdfParse = require("pdf-parse");

const { analyzeResume } = require("../services/geminiService");
const History = require("../models/History");

const uploadResume = async (req, res) => {
  let filePath = null;

  try {
    /* ===============================
       CHECK FILE
    =============================== */

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please upload a PDF resume file.",
      });
    }

    filePath = req.file.path;

    /* ===============================
       READ PDF
    =============================== */

    const fileBuffer = fs.readFileSync(filePath);

    /* ===============================
       EXTRACT TEXT
    =============================== */

    const pdfData = await pdfParse(fileBuffer);

    if (!pdfData.text || !pdfData.text.trim()) {
      return res.status(400).json({
        success: false,
        message:
          "No readable text was found in this PDF. Please upload a valid text-based resume PDF.",
      });
    }

    /* ===============================
       AI ANALYSIS
    =============================== */

    const aiResponse = await analyzeResume(pdfData.text);

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
       SUCCESS
    =============================== */

    return res.status(200).json({
      success: true,
      message: "Resume analyzed successfully.",
      analysis: aiResponse,
    });

  } catch (error) {

    console.error("========== RESUME CONTROLLER ERROR ==========");
    console.error("Status:", error?.status || error?.response?.status);
    console.error("Message:", error?.message);
    console.error("=============================================");

    const statusCode =
      error?.status ||
      error?.response?.status ||
      500;

    return res.status(statusCode).json({
      success: false,
      message:
        error?.message ||
        "Unable to analyze the resume. Please try again.",
    });

  } finally {

    /* ===============================
       DELETE TEMP FILE
    =============================== */

    if (filePath && fs.existsSync(filePath)) {
      try {
        fs.unlinkSync(filePath);
      } catch (deleteError) {
        console.error(
          "Unable to delete temporary PDF:",
          deleteError.message
        );
      }
    }
  }
};

module.exports = {
  uploadResume,
};