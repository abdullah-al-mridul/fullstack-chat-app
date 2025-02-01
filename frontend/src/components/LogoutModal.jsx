import React from "react";
import { LogOut } from "lucide-react";
import { useLogoutModalStore } from "../store/useLogoutModalStore";

const LogoutModal = () => {
  const { isOpen, closeModal, handleLogout } = useLogoutModalStore();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100]" onClick={closeModal}>
      {/* Backdrop with blur */}
      <div
        className="fixed inset-0 bg-base-100/80 backdrop-blur-sm"
        style={{
          animation: "fadeIn 0.3s ease-out forwards",
        }}
      />

      {/* Modal */}
      <div className="fixed inset-0 flex items-center justify-center p-4 z-[101]">
        <div
          className="relative bg-base-100 rounded-2xl p-6 shadow-2xl w-full max-w-sm border border-base-content/5"
          onClick={(e) => e.stopPropagation()}
          style={{
            animation:
              "modalSlideIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards",
          }}
        >
          <div className="text-center space-y-4">
            {/* Icon with animation */}
            <div className="relative mx-auto w-fit">
              <div className="size-16 rounded-2xl bg-error/10 flex items-center justify-center">
                <LogOut
                  className="size-8 text-error"
                  style={{
                    animation:
                      "iconBounce 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards",
                    animationDelay: "0.1s",
                  }}
                />
              </div>
            </div>

            {/* Text content with staggered fade in */}
            <div className="space-y-2">
              <h3
                className="text-xl font-bold"
                style={{
                  animation: "fadeSlideUp 0.4s ease-out forwards",
                  animationDelay: "0.2s",
                  opacity: 0,
                }}
              >
                Confirm Logout
              </h3>
              <p
                className="text-base-content/60"
                style={{
                  animation: "fadeSlideUp 0.4s ease-out forwards",
                  animationDelay: "0.3s",
                  opacity: 0,
                }}
              >
                Are you sure you want to logout? You will need to login again to
                access your account.
              </p>
            </div>

            {/* Buttons with animation */}
            <div
              className="flex gap-3 pt-4"
              style={{
                animation: "fadeSlideUp 0.4s ease-out forwards",
                animationDelay: "0.4s",
                opacity: 0,
              }}
            >
              <button className="btn flex-1 btn-ghost" onClick={closeModal}>
                Cancel
              </button>
              <button className="btn flex-1 btn-error" onClick={handleLogout}>
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogoutModal;
