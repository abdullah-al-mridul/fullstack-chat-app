import express from "express";
import { protectRoute } from "../middlewares/auth.middleware.js";
import {
  getUsers,
  getMessages,
  sendMessage,
  getConnectedUsers,
} from "../controllers/message.controller.js";
const router = express.Router();

router.get("/users", protectRoute, getUsers);
router.get("/connected-users", protectRoute, getConnectedUsers);
router.get("/:userId", protectRoute, getMessages);
router.post("/send/:userId", protectRoute, sendMessage);

export default router;
