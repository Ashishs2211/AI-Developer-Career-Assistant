const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const resumeRoutes = require("./routes/resumeRoutes");
const projectRoutes = require("./routes/projectRoutes");
const githubRoutes = require("./routes/githubRoutes");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/project", projectRoutes);
app.use("/api/github", githubRoutes);

app.get("/" , (req , res) =>{
  res.send("AI Developer Career Assistant API Running...");
});

app.use("/api/auth", authRoutes);
app.use("/api/resume", resumeRoutes);

module.exports = app; 