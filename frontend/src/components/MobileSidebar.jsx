import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Settings, LogOut, X } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useSidebarStore } from "../store/useSidebarStore";
import { useLogoutModalStore } from "../store/useLogoutModalStore";

const MobileSidebar = () => {
  const { authUser, logout } = useAuthStore();
  const { isSidebarOpen, closeSidebar } = useSidebarStore();
  const location = useLocation();
  const { openModal } = useLogoutModalStore();

  // Don't show mobile sidebar on chat page
  if (location.pathname === "/") return null;

  const handleLogout = () => {
    closeSidebar();
    logout();
  };

  return (
    <>
      {/* Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-40 lg:hidden"
          onClick={closeSidebar}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 w-72 border-r border-base-300 
        flex flex-col bg-base-100 z-50 transition-transform duration-300 lg:hidden
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="border-b border-base-300 p-4">
          <div className="flex items-center justify-between">
            <h2 className="font-medium">Menu</h2>
            <button
              onClick={closeSidebar}
              className="btn btn-ghost btn-sm btn-circle"
            >
              <X className="size-5" />
            </button>
          </div>
        </div>

        <div className="flex-1 p-4 space-y-2">
          <Link
            to="/settings"
            className="btn btn-ghost w-full justify-start gap-2"
            onClick={closeSidebar}
          >
            <Settings className="size-5" />
            <span>Settings</span>
          </Link>
          {authUser && (
            <button
              onClick={() => {
                closeSidebar();
                openModal();
              }}
              className="btn btn-ghost w-full justify-start gap-2 text-error hover:text-error"
            >
              <LogOut className="size-5" />
              <span>Logout</span>
            </button>
          )}
        </div>
      </aside>
    </>
  );
};

export default MobileSidebar;
