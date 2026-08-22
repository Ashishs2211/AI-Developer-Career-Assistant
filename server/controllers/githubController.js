const {
  fetchRepository,
  analyzeRepository,
} = require("../services/githubService");

const History = require("../models/History");


/* =========================================
   GITHUB REPOSITORY ANALYZER CONTROLLER
========================================= */

const analyzeGithubRepo = async (req, res) => {

  try {

    /* ===============================
       GET REPOSITORY URL
    =============================== */

    const { repoUrl } = req.body;


    /* ===============================
       VALIDATE URL
    =============================== */

    if (!repoUrl) {

      return res.status(400).json({
        success: false,
        message: "Repository URL is required",
      });

    }


    /* ===============================
       FETCH GITHUB REPOSITORY
    =============================== */

    const repo =
      await fetchRepository(repoUrl);


    /* ===============================
       AI ANALYSIS
    =============================== */

    const analysis =
      await analyzeRepository(repo);


    /* ===============================
       SAVE HISTORY
    =============================== */

    await History.create({

      user: req.user.userId,

      type: "github",

      title: repo.full_name,

      result: analysis,

    });


    /* ===============================
       SEND RESPONSE
    =============================== */

    return res.status(200).json({

      success: true,

      repository: {

        name: repo.name,

        owner:
          repo.owner?.login,

        language:
          repo.language,

        stars:
          repo.stargazers_count,

      },

      analysis,

    });


  } catch (error) {

    console.error(
      "========== GITHUB CONTROLLER ERROR =========="
    );

    console.error(error);
    console.error(error.stack);


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
        "GitHub Repository Analysis Failed",

    });

  }
};


/* =========================================
   EXPORT
========================================= */

module.exports = {
  analyzeGithubRepo,
};