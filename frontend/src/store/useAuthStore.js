import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import { showCustomToast } from "../utils/customToast";
import { io } from "socket.io-client";
import { useOnlineUsersStore } from "./useOnlineUsersStore";
const BASE_URL =
  import.meta.env.MODE == "development"
    ? import.meta.env.VITE_API_URL_SOCKET
    : "/";
export const useAuthStore = create((set, get) => ({
  authUser: null,
  isCheckingAuth: true,
  isSigningUp: false,
  isUpdatingProfile: false,
  isLoggingIn: false,
  socket: null,
  checkAuth: async () => {
    try {
      const response = await axiosInstance.get("/auth/check");
      set({ authUser: response.data });
      get().connectToSocket();
    } catch (err) {
      console.log("error checking auth", err);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },
  signUp: async (data) => {
    set({ isSigningUp: true });
    try {
      const response = await axiosInstance.post("/auth/signup", data);
      set({ authUser: response.data });
      showCustomToast("Account created successfully", "success");
      get().connectToSocket();
    } catch (err) {
      console.log("error signing up", err);
      showCustomToast(err.response.data.message);
    } finally {
      set({ isSigningUp: false });
    }
  },
  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      const response = await axiosInstance.post("/auth/login", data);
      set({ authUser: response.data });
      showCustomToast("Logged in successfully", "success");
      get().connectToSocket();
    } catch (err) {
      console.log("error logging in", err);
      showCustomToast(err.response.data.message);
    } finally {
      set({ isLoggingIn: false });
    }
  },
  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      set({ authUser: null });
      showCustomToast("Logged out successfully", "success");
      get().disconnectFromSocket();
    } catch (err) {
      console.log("error logging out", err);
      showCustomToast(err.response.data.message);
    }
  },
  updateProfile: async (data) => {
    set({ isUpdatingProfile: true });
    try {
      const response = await axiosInstance.put("/auth/update-profile", data);
      set({ authUser: response.data });
      showCustomToast("Profile updated successfully", "success");
    } catch (err) {
      showCustomToast("Something went wrong");
      console.log("error updating profile", err);
    } finally {
      set({ isUpdatingProfile: false });
    }
  },
  connectToSocket: () => {
    const { authUser } = get();
    if (!authUser || get().socket?.connected) return;

    const socket = io(BASE_URL, {
      query: {
        userId: authUser._id,
      },
    });

    socket.connect();
    set({ socket });

    socket.on("getOnlineUsers", (users) => {
      useOnlineUsersStore.getState().setOnlineUsers(users);
    });
  },
  disconnectFromSocket: () => {
    if (get().socket?.connected) {
      get().socket.disconnect();
      set({ socket: null });
    }
  },
}));
