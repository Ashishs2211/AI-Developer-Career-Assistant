const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

/* ================= REGISTER ================= */

const registerUser = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      githubUsername,
      linkedin,
      skills,
    } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields",
      });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      githubUsername,
      linkedin,
      skills,
    });

    const userResponse = user.toObject();
    delete userResponse.password;

    res.status(201).json({
      success: true,
      message: "User Registered Successfully",
      user: userResponse,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

/* ================= LOGIN ================= */

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide email and password",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }

    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid Credentials",
      });
    }

    const token = jwt.sign(
      {
        userId: user._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    const userResponse = user.toObject();
    delete userResponse.password;

    res.status(200).json({
      success: true,
      message: "Login Successful",
      token,
      user: userResponse,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ================= GET PROFILE ================= */

const getProfile = async (req, res) => {
  try {

    const user = await User.findById(
      req.user.userId
    ).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      user,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

/* ================= UPDATE PROFILE ================= */

const updateProfile = async (req, res) => {
  try {

    const userId = req.user.userId;

    const {
      name,
      githubUsername,
      linkedin,
      skills,
      profileImage,
    } = req.body;

    /* ---------- Validation ---------- */

    if (!name || !name.trim()) {
      return res.status(400).json({
        success: false,
        message: "Name is required",
      });
    }

    /* ---------- Format Skills ---------- */

    let formattedSkills = [];

    if (Array.isArray(skills)) {

      formattedSkills = skills
        .map((skill) => String(skill).trim())
        .filter((skill) => skill.length > 0);

    } else if (typeof skills === "string") {

      formattedSkills = skills
        .split(",")
        .map((skill) => skill.trim())
        .filter((skill) => skill.length > 0);

    }

    /* ---------- Update User ---------- */

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        name: name.trim(),

        githubUsername:
          githubUsername?.trim() || "",

        linkedin:
          linkedin?.trim() || "",

        skills: formattedSkills,

        profileImage:
          profileImage?.trim() || "",
      },
      {
        new: true,
        runValidators: true,
      }
    ).select("-password");

    /* ---------- User Not Found ---------- */

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    /* ---------- Response ---------- */

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user: updatedUser,
    });

  } catch (error) {

    console.error(
      "Update Profile Error:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Unable to update profile",
    });

  }
};

/* ================= EXPORTS ================= */

module.exports = {
  registerUser,
  loginUser,
  getProfile,
  updateProfile,
};