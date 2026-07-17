const History = require("../models/History");

// Get History
const getHistory = async (req, res) => {
  try {

    const { type } = req.query;

    let filter = {
      user: req.user.userId,
    };

    if (type) {
      filter.type = type;
    }

    const history = await History.find(filter).sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      total: history.length,
      history,
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// Dashboard Statistics
const getDashboardStats = async (req, res) => {
  try {

    const user = req.user.userId;

    const resume = await History.countDocuments({
      user,
      type: "resume",
    });

    const github = await History.countDocuments({
      user,
      type: "github",
    });

    const project = await History.countDocuments({
      user,
      type: "project",
    });

    const interview = await History.countDocuments({
      user,
      type: "interview",
    });

    const roadmap = await History.countDocuments({
      user,
      type: "roadmap",
    });

    res.status(200).json({
      success: true,
      stats: {
        resume,
        github,
        project,
        interview,
        roadmap,
      },
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// Delete History
const deleteHistory = async (req, res) => {
  try {

    const history = await History.findOne({
      _id: req.params.id,
      user: req.user.userId,
    });

    if (!history) {
      return res.status(404).json({
        success: false,
        message: "History not found",
      });
    }

    await history.deleteOne();

    res.status(200).json({
      success: true,
      message: "History deleted successfully",
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
  getHistory,
  deleteHistory,
  getDashboardStats,
};