const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  registerUser,
  loginUser,
  getProfile,
  updateProfile,
  changePassword,
} = require("../controllers/authController");

// ================= PUBLIC ROUTES =================

router.post("/register", registerUser);

router.post("/login", loginUser);

// ================= PROTECTED ROUTES =================

// Get logged-in user's profile
router.get("/profile", protect, getProfile);

// Update logged-in user's profile
router.put("/profile", protect, updateProfile);

router.put(
  "/change-password",
  protect,
  changePassword
);

module.exports = router;