import { create } from "zustand";

export const useOnlineUsersStore = create((set) => ({
  onlineUsers: [],
  setOnlineUsers: (users) => set({ onlineUsers: users }),
}));
