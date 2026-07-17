const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  generateRoadmap,
} = require("../controllers/roadmapController");

router.post(
  "/generate",
  protect,
  generateRoadmap
);

module.exports = router;