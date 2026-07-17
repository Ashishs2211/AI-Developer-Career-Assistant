const express = require("express");

const {
  getHistory,
  deleteHistory,
  getDashboardStats,
} = require("../controllers/historyController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

// Dashboard Stats
router.get("/stats", protect, getDashboardStats);

// Get all history
router.get("/", protect, getHistory);

// Delete history
router.delete("/:id", protect, deleteHistory);

module.exports = router;