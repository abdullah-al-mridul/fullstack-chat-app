import React from "react";
import { create } from "zustand";
import { showCustomToast } from "../utils/customToast";
import { axiosInstance } from "../lib/axios.js";
import { useAuthStore } from "./useAuthStore.js";
import { useNotificationStore } from "./useNotificationStore";

export const useChatStore = create((set, get) => ({
  messages: [],
  users: [],
  selectedUser: null,
  isUserLoading: false,
  isMessagesLoading: false,
  connectedUsers: [],
  getUsers: async () => {
    set({ isUserLoading: true });
    try {
      const response = await axiosInstance.get("/messages/users");
      set({ users: response.data });
    } catch (error) {
      console.log(error);
      showCustomToast("Failed to get users");
    } finally {
      set({ isUserLoading: false });
    }
  },
  getMessages: async (userId) => {
    set({ isMessagesLoading: true });
    try {
      const response = await axiosInstance.get(`/messages/${userId}`);
      set({ messages: response.data });
    } catch (error) {
      showCustomToast("Failed to get messages");
    } finally {
      set({ isMessagesLoading: false });
    }
  },
  setSelectedUser: (userId) => {
    set({ selectedUser: userId });
  },
  sendMessage: async (data) => {
    const { selectedUser, messages } = get();
    try {
      const response = await axiosInstance.post(
        `/messages/send/${selectedUser._id}`,
        data
      );
      set({ messages: [...messages, response.data] });
    } catch (error) {
      console.log(error);
      showCustomToast("Failed to send message");
    }
  },
  subscribeToNewMessage: () => {
    const { selectedUser, users } = get();
    if (!selectedUser) return;
    const socket = useAuthStore.getState().socket;
    socket.on("newMessage", (message) => {
      if (message.senderId !== selectedUser._id) return;
      set({ messages: [...get().messages, message] });

      // Show notification if window is not focused
      if (!document.hasFocus()) {
        const { showNotification } = useNotificationStore.getState();
        const sender = users.find((u) => u._id === message.senderId);

        showNotification({
          title: sender?.fullName || "New Message",
          body: message.text,
          onClick: () => {
            // Select the chat if not already selected
            if (selectedUser?._id !== message.senderId) {
              const user = users.find((u) => u._id === message.senderId);
              if (user) setSelectedUser(user);
            }
          },
        });
      }
    });
  },
  unsubscribeFromNewMessage: () => {
    const { selectedUser } = get();
    if (!selectedUser) return;
    const socket = useAuthStore.getState().socket;
    socket.off("newMessage");
  },
  getConnectedUsers: async () => {
    try {
      const response = await axiosInstance.get("/messages/connected-users");
      set({ connectedUsers: response.data });
    } catch (error) {
      console.log(error);
      showCustomToast("Failed to get connected users");
    }
  },
}));
