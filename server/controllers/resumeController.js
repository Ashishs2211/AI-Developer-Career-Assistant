const fs = require("fs");
const pdfParse = require("pdf-parse");

const { analyzeResume } = require("../services/geminiService");
const History = require("../models/History");

const uploadResume = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please upload a PDF file",
      });
    }

    // Read uploaded PDF
    const fileBuffer = fs.readFileSync(req.file.path);

    // Extract text
    const pdfData = await pdfParse(fileBuffer);

    // AI Analysis
    const aiResponse = await analyzeResume(pdfData.text);

    // Save History
    await History.create({
      user: req.user.userId,
      type: "resume",
      title: req.file.originalname,
      result: aiResponse,
    });

    // Delete uploaded file
    fs.unlinkSync(req.file.path);

    res.status(200).json({
      success: true,
      message: "Resume analyzed successfully",
      analysis: aiResponse,
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
  uploadResume,
};