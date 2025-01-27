import express from "express";
import dotenv from "dotenv";
import authRouter from "./routes/auth.route.js";
import messageRouter from "./routes/messages.route.js";
import { connectDB } from "./lib/db.js";
import cookieParser from "cookie-parser";
const app = express();

dotenv.config();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authRouter);
app.use("/api/messages", messageRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});
