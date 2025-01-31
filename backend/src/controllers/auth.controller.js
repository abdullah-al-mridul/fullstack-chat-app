import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import { generateToken } from "../lib/utils.js";
import cloudinary from "../lib/cloudinary.js";
import crypto from "crypto";
import { sendVerificationEmail } from "../lib/mailer.js";

export const signup = async (req, res) => {
  const { email, fullName, password } = req.body;
  try {
    //hash password
    if (!fullName || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters" });
    }
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({ fullName, email, password: hashedPassword });
    const newUserSaved = await newUser.save();
    if (!newUserSaved) {
      return res.status(400).json({ message: "User not created" });
    } else {
      //generate token
      generateToken(newUserSaved._id, res);
      await newUserSaved.save();
      res.status(201).json({
        _id: newUserSaved._id,
        fullName: newUserSaved.fullName,
        email: newUserSaved.email,
        profilePic: newUserSaved.profilePic,
      });
    }
  } catch (err) {
    res
      .status(500)
      .json({ message: "Internal server error", error: err.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    generateToken(user._id, res);
    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      profilePic: user.profilePic,
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Internal server error", error: err.message });
  }
};

export const logout = (req, res) => {
  try {
    res.cookie("token", "", { maxAge: 0 });
    res.status(200).json({ message: "Logout successful" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Internal server error", error: err.message });
  }
};

export const updateUser = async (req, res) => {
  const { profilePic } = req.body;
  const userID = req.user._id;
  try {
    if (!profilePic) {
      return res.status(400).json({ message: "Profile picture is required" });
    }
    const uploadResult = await cloudinary.uploader.upload(profilePic);
    const updatedUser = await User.findByIdAndUpdate(
      userID,
      {
        profilePic: uploadResult.secure_url,
      },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Internal server error", error: err.message });
  }
};

export const checkUser = (req, res) => {
  try {
    res.status(200).json(req.user);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Internal server error", error: err.message });
  }
};

export const sendVerification = async (req, res) => {
  const userId = req.user._id;
  if (!userId) return res.status(400).json({ message: "Invalid request" });

  try {
    const verificationCode = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    // Update user with new verification code
    const user = await User.findByIdAndUpdate(
      userId,
      {
        verificationCode,
        codeExpiresAt: Date.now() + 10 * 60 * 1000, // 10 minutes expiry
      },
      { new: true }
    );

    if (!user) return res.status(400).json({ message: "User not found" });

    // Send verification email
    await sendVerificationEmail(
      req.user.email,
      "Verify your email",
      verificationCode
    );

    res.status(200).json({ message: "Verification code sent successfully" });
  } catch (error) {
    console.error("Error sending verification:", error);
    res.status(500).json({
      message: "Failed to send verification code",
      error: error.message,
    });
  }
};

export const verifyCode = async (req, res) => {
  try {
    const { code } = req.body;
    const userId = req.user._id;

    const user = await User.findById(userId);

    if (!user.verificationCode) {
      return res.status(400).json({
        message: "No verification code found. Please request a new code.",
      });
    }

    // Check if code has expired
    if (Date.now() > user.codeExpiresAt) {
      // Clear the expired code
      await User.findByIdAndUpdate(userId, {
        verificationCode: null,
        codeExpiresAt: null,
      });

      return res.status(400).json({
        message: "Verification code has expired. Please request a new code.",
      });
    }

    // Verify the code
    if (code !== user.verificationCode) {
      return res.status(400).json({
        message: "Invalid verification code",
      });
    }

    // Update user verification status and clear the code
    await User.findByIdAndUpdate(userId, {
      isVerified: true,
      verificationCode: null,
      codeExpiresAt: null,
    });

    res.status(200).json({
      message: "Email verified successfully",
    });
  } catch (error) {
    console.error("Error verifying code:", error);
    res.status(500).json({
      message: "Failed to verify code",
      error: error.message,
    });
  }
};
