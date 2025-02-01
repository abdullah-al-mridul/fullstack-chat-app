import express from "express";
import dotenv from "dotenv";
import authRouter from "./routes/auth.route.js";
import messageRouter from "./routes/messages.route.js";
import { connectDB } from "./lib/db.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { app, server } from "./lib/socket.io.js";
import path from "node:path";
dotenv.config();
const dirname = path.resolve();
const frontendPath = path.join(dirname, "../frontend/dist/index.html");
const frontendDistPath = path.join(dirname, "../frontend/dist/");
const PORT = process.env.PORT || 3000;
const IP = process.env.IP || "192.168.0.102";
app.use(express.json({ limit: "10mb" }));
app.use(cookieParser());
// app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use("/api/auth", authRouter);
app.use("/api/messages", messageRouter);
if (process.env.NODE_ENV === "production") {
  app.use(express.static(frontendDistPath));
  app.get("*", (req, res) => {
    res.sendFile(frontendPath);
  });
}

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(frontendPath);
  connectDB();
});
