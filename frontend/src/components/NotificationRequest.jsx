import React, { useEffect, useState } from "react";
import { Bell } from "lucide-react";
import { useNotificationStore } from "../store/useNotificationStore";

const NotificationRequest = () => {
  const { permission, requestPermission } = useNotificationStore();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show notification request after a short delay when app opens
    if (permission === "default" || permission === "denied") {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 2000); // 2 second delay

      return () => clearTimeout(timer);
    }
  }, [permission]);

  if (!isVisible || permission === "granted") return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 animate-in fade-in slide-in-from-bottom-4 duration-300">
      <div className="bg-base-100 rounded-2xl p-4 shadow-xl border border-base-content/5 max-w-sm">
        <div className="flex items-start gap-4">
          <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
            <Bell className="size-6 text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-medium mb-1">Enable Notifications</h3>
            <p className="text-sm text-base-content/60 mb-3">
              Get notified when you receive new messages, even when you're not
              using the app.
            </p>
            <div className="flex gap-2">
              <button
                onClick={async () => {
                  await requestPermission();
                  setIsVisible(false);
                }}
                className="btn btn-primary btn-sm flex-1"
              >
                Enable
              </button>
              <button
                onClick={() => setIsVisible(false)}
                className="btn btn-ghost btn-sm flex-1"
              >
                Not Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationRequest;
