import React, { useEffect, useState } from "react";
import SidebarSkeleton from "./skeleton/SidebarSkeleton";
import { useChatStore } from "../store/useChatStore";
import { Users, X, Settings, LogOut } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useSidebarStore } from "../store/useSidebarStore";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const { users, getUsers, selectedUser, setSelectedUser, isUserLoading } =
    useChatStore();
  const { onlineUsers, logout } = useAuthStore();
  const { isSidebarOpen, closeSidebar } = useSidebarStore();
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);
  const location = useLocation();

  // Check if we're on a page where sidebar should be mobile-only
  const isMobileOnlyPage = ["/profile", "/settings"].includes(
    location.pathname
  );

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const handleUserSelect = (user) => {
    setSelectedUser(user);
    closeSidebar();
  };

  const handleLogout = () => {
    closeSidebar();
    logout();
  };

  const filteredUsers = showOnlineOnly
    ? users.filter((user) => onlineUsers.includes(user._id))
    : users;

  if (isUserLoading) return <SidebarSkeleton />;

  return (
    <>
      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-40 lg:hidden"
          onClick={closeSidebar}
        />
      )}

      <aside
        className={`fixed lg:static inset-y-0 left-0 h-full w-72 border-r border-base-300 
        flex flex-col bg-base-100 z-50 transition-transform duration-300
        ${isMobileOnlyPage ? "lg:hidden" : "lg:translate-x-0"}
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        {/* Top Section */}
        <div className="border-b border-base-300 w-full p-5">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <Users className="size-6" />
              <span className="font-medium">Contacts</span>
            </div>
            {/* Close button for mobile */}
            <button
              onClick={closeSidebar}
              className="btn btn-ghost btn-sm btn-circle lg:hidden"
            >
              <X className="size-5" />
            </button>
          </div>

          <div className="mt-3 flex items-center gap-2">
            <label
              htmlFor="onlineOnly"
              className="cursor-pointer flex items-center gap-2"
            >
              <input
                type="checkbox"
                checked={showOnlineOnly}
                onChange={() => setShowOnlineOnly(!showOnlineOnly)}
                id="onlineOnly"
                className="checkbox checkbox-sm"
              />
              <span className="text-sm">Online only</span>
            </label>
            <span className="text-xs text-base-content/60">
              {onlineUsers.length - 1} online
            </span>
          </div>
        </div>

        {/* Users List */}
        <div className="flex-1 overflow-y-auto w-full py-3">
          {filteredUsers.map((user) => (
            <button
              key={user._id}
              onClick={() => handleUserSelect(user)}
              className={`w-full p-3 flex items-center gap-3 hover:bg-base-300 transition-colors
                ${
                  selectedUser?._id === user._id
                    ? "bg-base-300 ring-1 ring-base-300"
                    : ""
                }`}
            >
              <div className="relative">
                <img
                  src={user.profilePic || "/avatar.png"}
                  alt={user.fullName}
                  className="size-10 rounded-full object-cover"
                />
                {onlineUsers.includes(user._id) && (
                  <span className="absolute bottom-0 right-0 size-3 bg-green-500 rounded-full ring-2 ring-base-100" />
                )}
              </div>
              <div className="text-left min-w-0">
                <div className="font-medium truncate">{user.fullName}</div>
                <div className="text-sm text-base-content/60">
                  {onlineUsers.includes(user._id) ? "Online" : "Offline"}
                </div>
              </div>
            </button>
          ))}
          {filteredUsers.length === 0 && (
            <div className="text-center text-base-content/60 py-4">
              No users found
            </div>
          )}
        </div>

        {/* Bottom Actions - Only show on mobile */}
        <div className="border-t border-base-300 p-4 space-y-2 lg:hidden">
          <Link
            to="/settings"
            className="btn btn-ghost w-full justify-start gap-2"
            onClick={closeSidebar}
          >
            <Settings className="size-5" />
            <span>Settings</span>
          </Link>
          <button
            onClick={handleLogout}
            className="btn btn-ghost w-full justify-start gap-2 text-error hover:text-error"
          >
            <LogOut className="size-5" />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
