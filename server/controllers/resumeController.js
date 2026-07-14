const fs = require("fs");
const pdfParse = require("pdf-parse");
const { analyzeResume } = require("../services/geminiService");

const uploadResume = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please upload a PDF file",
      });
    }

    const fileBuffer = fs.readFileSync(req.file.path);

    const pdfData = await pdfParse(fileBuffer);

    const aiResponse = await analyzeResume(pdfData.text);

res.status(200).json({
  success: true,
  message: "Resume analyzed successfully",
  analysis: aiResponse,
});

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  uploadResume,
};