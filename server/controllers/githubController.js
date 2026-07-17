const {
  fetchRepository,
  analyzeRepository,
} = require("../services/githubService");

const History = require("../models/History");

const analyzeGithubRepo = async (req, res) => {
  try {
    const { repoUrl } = req.body;

    if (!repoUrl) {
      return res.status(400).json({
        success: false,
        message: "Repository URL is required",
      });
    }

    // Fetch repository details
    const repo = await fetchRepository(repoUrl);

    // AI Analysis
    const analysis = await analyzeRepository(repo);

    // Save History in MongoDB
    await History.create({
      user: req.user.userId,
      type: "github",
      title: repo.full_name,
      result: analysis,
    });

    res.status(200).json({
      success: true,
      repository: {
        name: repo.name,
        owner: repo.owner.login,
        language: repo.language,
        stars: repo.stargazers_count,
      },
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
  analyzeGithubRepo,
};