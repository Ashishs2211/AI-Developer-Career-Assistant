const {
  generateCareerRoadmap,
} = require("../services/roadmapService");

const History = require("../models/History");

const generateRoadmap = async (req, res) => {
  try {
    const { goal, level } = req.body;

    if (!goal || !level) {
      return res.status(400).json({
        success: false,
        message: "Goal and level are required.",
      });
    }

    // Generate AI Roadmap
    const roadmap = await generateCareerRoadmap(goal, level);

    // Save History
    await History.create({
      user: req.user.userId,
      type: "roadmap",
      title: `${goal} (${level})`,
      result: roadmap,
    });

    res.status(200).json({
      success: true,
      roadmap,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  generateRoadmap,
};