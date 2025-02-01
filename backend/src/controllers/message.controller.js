import { getRecieverSocketId } from "../lib/socket.io.js";
import Message from "../models/message.model.js";
import User from "../models/user.model.js";
import cloudinary from "cloudinary";
import { io } from "../lib/socket.io.js";
export const getUsers = async (req, res) => {
  try {
    const loggedInUser = req.user._id;
    const filteredUsers = await User.find({
      _id: { $ne: loggedInUser },
    }).select("-password");
    res.status(200).json(filteredUsers);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Internal server error", error: err.message });
  }
};

export const getMessages = async (req, res) => {
  try {
    const { userId: userToChatId } = req.params;
    const myId = req.user._id;
    const messages = await Message.find({
      $or: [
        { senderId: myId, receiverId: userToChatId },
        { senderId: userToChatId, receiverId: myId },
      ],
    });
    res.status(200).json(messages);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Internal server error", error: err.message });
  }
};

export const sendMessage = async (req, res) => {
  try {
    const { text, image } = req.body;
    const { userId: receiverId } = req.params;
    let imageUrl = null;
    if (image) {
      const result = await cloudinary.uploader.upload(image, {
        folder: "messages",
      });
      imageUrl = result.secure_url;
    }
    const newMessage = new Message({
      senderId: req.user._id,
      receiverId,
      text,
      image: imageUrl,
    });
    await newMessage.save();
    const receiverSocketId = getRecieverSocketId(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }
    res.status(201).json(newMessage);
  } catch (err) {
    console.log(err.message);
    res
      .status(500)
      .json({ message: "Internal server error", error: err.message });
  }
};

export const getConnectedUsers = async (req, res) => {
  try {
    const userId = req.user._id;

    // Find all messages where user is either sender or receiver
    const messages = await Message.find({
      $or: [{ senderId: userId }, { receiverId: userId }],
    });

    // Extract unique user IDs from messages
    const connectedUserIds = [
      ...new Set([
        ...messages.map((msg) => msg.senderId.toString()),
        ...messages.map((msg) => msg.receiverId.toString()),
      ]),
    ].filter((id) => id !== userId.toString());

    // Get user details for these IDs
    const connectedUsers = await User.find({
      _id: { $in: connectedUserIds },
    }).select("-password");

    res.status(200).json(connectedUsers);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
