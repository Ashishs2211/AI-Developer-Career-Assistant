const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const resumeRoutes = require("./routes/resumeRoutes");
const projectRoutes = require("./routes/projectRoutes");
const githubRoutes = require("./routes/githubRoutes");
const interviewRoutes = require("./routes/interviewRoutes");
const roadmapRoutes = require("./routes/roadmapRoutes");
const historyRoutes = require("./routes/historyRoutes");
const chatRoutes = require("./routes/chatRoutes");

const errorHandler = require(
  "./middleware/errorMiddleware"
);

const app = express();

/* =========================================
   GLOBAL MIDDLEWARE
========================================= */

const allowedOrigins = [
  "http://localhost:5173",
  "https://ai-developer-career-assistant-three.vercel.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests without an origin
      // such as Postman or server-to-server requests
      if (!origin) {
        return callback(null, true);
      }

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

/* =========================================
   API ROUTES
========================================= */

app.use("/api/auth", authRoutes);
app.use("/api/resume", resumeRoutes);
app.use("/api/project", projectRoutes);
app.use("/api/github", githubRoutes);
app.use("/api/interview", interviewRoutes);
app.use("/api/roadmap", roadmapRoutes);
app.use("/api/history", historyRoutes);
app.use("/api/chat", chatRoutes);

/* =========================================
   HEALTH CHECK
========================================= */

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "AI Developer Career Assistant API Running...",
  });
});

/* =========================================
   404 ROUTE HANDLER
========================================= */

app.use((req, res) => {
  return res.status(404).json({
    success: false,
    message: "API route not found.",
  });
});

/* =========================================
   GLOBAL ERROR HANDLER
========================================= */

app.use(errorHandler);

module.exports = app;