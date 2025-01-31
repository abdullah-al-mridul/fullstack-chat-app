import express from "express";
const router = express.Router();
import {
  signup,
  login,
  logout,
  updateUser,
  checkUser,
  sendVerification,
  verifyCode,
} from "../controllers/auth.controller.js";
import { protectRoute } from "../middlewares/auth.middleware.js";

router.post("/signup", signup);

router.post("/login", login);

router.post("/logout", logout);

router.put("/update-profile", protectRoute, updateUser);

router.get("/check", protectRoute, checkUser);

router.post("/send-code/", protectRoute, sendVerification);

router.post("/verify-code", protectRoute, verifyCode);

export default router;
