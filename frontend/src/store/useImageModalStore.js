import { create } from "zustand";

export const useImageModalStore = create((set) => ({
  modalImage: null,
  setModalImage: (image) => set({ modalImage: image }),
  closeModal: () => set({ modalImage: null }),
}));
