const express = require("express");
const router = express.Router();

const upload = require("../config/multer");
const protect = require("../middleware/authMiddleware");

const {
  uploadProject,
} = require("../controllers/projectController");

router.post(
  "/upload",
  protect,
  upload.single("project"),
  uploadProject
);

module.exports = router;