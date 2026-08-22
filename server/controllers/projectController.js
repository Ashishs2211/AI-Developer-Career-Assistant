const AdmZip = require("adm-zip");
const fs = require("fs");

const {
  reviewProject,
} = require("../services/projectReviewService");

const History = require("../models/History");


const uploadProject = async (req, res) => {

  let filePath = null;

  try {

    /* ===============================
       CHECK FILE
    =============================== */

    if (!req.file) {

      return res.status(400).json({
        success: false,
        message: "Please upload a ZIP file",
      });

    }


    filePath = req.file.path;


    /* ===============================
       READ ZIP
    =============================== */

    const zip =
      new AdmZip(filePath);


    const entries =
      zip.getEntries();


    /* ===============================
       GET FILE NAMES
    =============================== */

    const files =
      entries
        .filter((entry) => !entry.isDirectory)
        .map((entry) => entry.entryName);


    if (files.length === 0) {

      return res.status(400).json({
        success: false,
        message: "The ZIP file does not contain any files.",
      });

    }


    /* ===============================
       AI REVIEW
    =============================== */

    const analysis =
      await reviewProject(files);


    /* ===============================
       SAVE HISTORY
    =============================== */

    await History.create({

      user: req.user.userId,

      type: "project",

      title: req.file.originalname,

      result: analysis,

    });


    /* ===============================
       DELETE ZIP
    =============================== */

    if (filePath && fs.existsSync(filePath)) {

      fs.unlinkSync(filePath);

    }


    /* ===============================
       SUCCESS
    =============================== */

    return res.status(200).json({

      success: true,

      totalFiles: files.length,

      analysis,

    });


  } catch (error) {

    console.error(
      "========== PROJECT UPLOAD ERROR =========="
    );

    console.error(error);
    console.error(error.stack);


    /* ===============================
       DELETE TEMP FILE
    =============================== */

    if (
      filePath &&
      fs.existsSync(filePath)
    ) {

      try {

        fs.unlinkSync(filePath);

      } catch (deleteError) {

        console.error(
          "Unable to delete temporary ZIP:",
          deleteError.message
        );

      }
    }


    /* ===============================
       ERROR STATUS
    =============================== */

    const statusCode =
      error?.status ||
      error?.response?.status ||
      500;


    /* ===============================
       ERROR RESPONSE
    =============================== */

    return res.status(statusCode).json({

      success: false,

      message:
        error?.message ||
        "Project Review Failed",

    });

  }
};


module.exports = {
  uploadProject,
};