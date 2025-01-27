import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import { generateToken } from "../lib/utils.js";
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

export const login = (req, res) => {
  res.send("Login");
};

export const logout = (req, res) => {
  res.send("Logout");
};
