const AdmZip = require("adm-zip");
const { reviewProject } = require("../services/projectReviewService");

const uploadProject = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please upload a ZIP file",
      });
    }

    const zip = new AdmZip(req.file.path);

    const entries = zip.getEntries();

    const files = entries.map((entry) => entry.entryName);

    const analysis = await reviewProject(files);

res.status(200).json({
  success: true,
  totalFiles: files.length,
  analysis,
});

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  uploadProject,
};