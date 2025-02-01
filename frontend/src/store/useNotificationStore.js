import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useNotificationStore = create(
  persist(
    (set) => ({
      permission: Notification.permission,
      lastAsked: null,
      setPermission: (permission) => set({ permission }),

      // Request notification permission
      requestPermission: async () => {
        try {
          const permission = await Notification.requestPermission();
          set({
            permission,
            lastAsked: Date.now(),
          });
          return permission;
        } catch (error) {
          console.error("Error requesting notification permission:", error);
          return "denied";
        }
      },

      // Show notification
      showNotification: ({ title, body, icon = "/logo.png", onClick }) => {
        try {
          if (Notification.permission !== "granted") return;

          const notification = new Notification(title, {
            body,
            icon,
            badge: "/logo.png",
            timestamp: Date.now(),
          });

          if (onClick) {
            notification.onclick = () => {
              window.focus();
              onClick();
              notification.close();
            };
          }
        } catch (error) {
          console.error("Error showing notification:", error);
        }
      },
    }),
    {
      name: "notification-store",
      partialize: (state) => ({ lastAsked: state.lastAsked }),
    }
  )
);
