import { create } from "zustand";
import { useAuthStore } from "./useAuthStore";

export const useLogoutModalStore = create((set) => ({
  isOpen: false,
  openModal: () => set({ isOpen: true }),
  closeModal: () => set({ isOpen: false }),
  handleLogout: () => {
    const { logout } = useAuthStore.getState();
    logout();
    set({ isOpen: false });
  },
}));
