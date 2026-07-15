const express = require("express");
const router = express.Router();

const { analyzeGithubRepo } = require("../controllers/githubController");

router.post("/analyze", analyzeGithubRepo);

module.exports = router;