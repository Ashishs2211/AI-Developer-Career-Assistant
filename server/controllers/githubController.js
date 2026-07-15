const {
  fetchRepository,
  analyzeRepository,
} = require("../services/githubService");

const analyzeGithubRepo = async (req, res) => {
  try {
    const { repoUrl } = req.body;

    if (!repoUrl) {
      return res.status(400).json({
        success: false,
        message: "Repository URL is required",
      });
    }

    const repo = await fetchRepository(repoUrl);

    const analysis = await analyzeRepository(repo);

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
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  analyzeGithubRepo,
};