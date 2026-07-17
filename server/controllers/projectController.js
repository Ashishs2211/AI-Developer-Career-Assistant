const AdmZip = require("adm-zip");
const fs = require("fs");

const { reviewProject } = require("../services/projectReviewService");
const History = require("../models/History");

const uploadProject = async (req, res) => {
  try {
    // Check ZIP file
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please upload a ZIP file",
      });
    }

    // Read ZIP
    const zip = new AdmZip(req.file.path);

    // Get all files
    const entries = zip.getEntries();

    const files = entries.map((entry) => entry.entryName);

    // AI Review
    const analysis = await reviewProject(files);

    // Save History
    await History.create({
      user: req.user.userId,
      type: "project",
      title: req.file.originalname,
      result: analysis,
    });

    // Delete uploaded ZIP
    fs.unlinkSync(req.file.path);

    res.status(200).json({
      success: true,
      totalFiles: files.length,
      analysis,
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
  uploadProject,
};