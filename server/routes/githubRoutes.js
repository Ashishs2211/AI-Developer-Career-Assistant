const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  analyzeGithubRepo,
} = require("../controllers/githubController");

router.post(
  "/analyze",
  protect,
  analyzeGithubRepo
);

module.exports = router;