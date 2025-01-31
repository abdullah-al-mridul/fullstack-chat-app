import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import { showCustomToast } from "../utils/customToast";
import { useAuthStore } from "./useAuthStore";

export const useVerificationStore = create((set, get) => ({
  // States
  isCodeSent: false,
  isSendingCode: false,
  isVerifying: false,
  verificationCode: ["", "", "", "", "", ""],

  // Reset state
  resetState: () => {
    set({
      isCodeSent: false,
      isSendingCode: false,
      isVerifying: false,
      verificationCode: ["", "", "", "", "", ""],
    });
  },

  // Set verification code
  setVerificationCode: (index, value) => {
    const newCode = [...get().verificationCode];
    newCode[index] = value;
    set({ verificationCode: newCode });
  },

  // Send verification code
  sendVerificationCode: async () => {
    set({ isSendingCode: true });
    try {
      await axiosInstance.post(`/auth/send-code/`);
      set({ isCodeSent: true });
      showCustomToast("Verification code sent successfully", "success");
    } catch (error) {
      showCustomToast(
        error.response?.data?.message || "Failed to send verification code"
      );
      console.error("Error sending verification code:", error);
    } finally {
      set({ isSendingCode: false });
    }
  },

  // Verify code
  verifyCode: async () => {
    const code = get().verificationCode.join("");
    if (code.length !== 6) return;

    set({ isVerifying: true });
    try {
      await axiosInstance.post("/auth/verify-code", {
        code,
      });

      // Update auth user state with verified status
      const { authUser } = useAuthStore.getState();
      useAuthStore.setState({
        authUser: { ...authUser, isVerified: true },
      });

      showCustomToast("Email verified successfully", "success");
      get().resetState();
    } catch (error) {
      showCustomToast(error.response?.data?.message || "Failed to verify code");
      console.error("Error verifying code:", error);
    } finally {
      set({ isVerifying: false });
    }
  },

  // Handle code input change
  handleCodeChange: (index, value) => {
    if (!/^\d*$/.test(value)) return; // Only allow digits

    get().setVerificationCode(index, value);

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`code-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  },

  // Handle backspace key
  handleKeyDown: (index, e) => {
    if (e.key === "Backspace" && !get().verificationCode[index] && index > 0) {
      const prevInput = document.getElementById(`code-${index - 1}`);
      if (prevInput) prevInput.focus();
    }
  },
}));
