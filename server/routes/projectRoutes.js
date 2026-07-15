const express = require("express");
const router = express.Router();

const multer = require("multer");
const path = require("path");

const { uploadProject } = require("../controllers/projectController");

// Multer Storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },

  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage,
});

router.post("/upload", upload.single("project"), uploadProject);

module.exports = router;