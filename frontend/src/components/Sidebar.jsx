import React, { useEffect, useState, useCallback } from "react";
import SidebarSkeleton from "./skeleton/SidebarSkeleton";
import { useChatStore } from "../store/useChatStore";
import { Users, X, Settings, LogOut, Search } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useSidebarStore } from "../store/useSidebarStore";
import { Link, useLocation } from "react-router-dom";
import { useLogoutModalStore } from "../store/useLogoutModalStore";
import { useOnlineUsersStore } from "../store/useOnlineUsersStore";

const Sidebar = () => {
  const {
    users,
    getUsers,
    selectedUser,
    setSelectedUser,
    isUserLoading,
    connectedUsers,
    getConnectedUsers,
  } = useChatStore();

  const onlineUsers = useOnlineUsersStore((state) => state.onlineUsers);

  const { isSidebarOpen, closeSidebar } = useSidebarStore();
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const location = useLocation();
  const { openModal } = useLogoutModalStore();

  // Check if we're on a page where sidebar should be mobile-only
  const isMobileOnlyPage = ["/profile", "/settings"].includes(
    location.pathname
  );

  useEffect(() => {
    getUsers();
    getConnectedUsers();
  }, [getUsers, getConnectedUsers]);

  const handleUserSelect = (user) => {
    setSelectedUser(user);
    closeSidebar();
  };

  // Filter users based on search and connection status
  const nonConnectedUsers = users.filter(
    (user) => !connectedUsers.find((u) => u._id === user._id)
  );

  const filterUsers = useCallback(
    (userList) => {
      return userList.filter((user) => {
        const matchesSearch = user.fullName
          .toLowerCase()
          .includes(searchQuery.toLowerCase());
        const matchesOnline = showOnlineOnly
          ? onlineUsers.includes(user._id)
          : true;
        return matchesSearch && matchesOnline;
      });
    },
    [searchQuery, showOnlineOnly, onlineUsers]
  );

  const filteredConnectedUsers = filterUsers(connectedUsers);
  const filteredNonConnectedUsers = filterUsers(nonConnectedUsers);

  // Get total online users (excluding current user)
  const totalOnlineUsers = onlineUsers.length - 1;

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
        <div className="p-4 border-b border-base-300">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <h2 className="font-medium">Messages</h2>
              {/* Online count badge */}
              {totalOnlineUsers > 0 && (
                <span className="px-2 py-0.5 text-xs rounded-full bg-primary/10 text-primary">
                  {totalOnlineUsers} online
                </span>
              )}
            </div>
            <button
              onClick={() => setShowOnlineOnly(!showOnlineOnly)}
              className={`btn btn-sm btn-ghost gap-2 ${
                showOnlineOnly ? "text-primary" : ""
              }`}
            >
              <Users className="size-4" />
              <span className="text-sm">Online</span>
            </button>
          </div>

          {/* Search input */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search users..."
              name="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input input-sm bg-base-200/50 w-full pl-10 pr-4"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-base-content/50" />
          </div>
        </div>

        {/* Users List */}
        <div className="flex-1 overflow-y-auto">
          {/* Connected Users Section */}
          {filteredConnectedUsers.length > 0 && (
            <div>
              <div className="p-2 text-xs font-medium text-base-content/50 bg-base-200/50">
                CONVERSATIONS
              </div>
              {filteredConnectedUsers.map((user) => (
                <UserButton
                  key={user._id}
                  user={user}
                  isOnline={onlineUsers.includes(user._id)}
                  isSelected={selectedUser?._id === user._id}
                  onClick={() => handleUserSelect(user)}
                />
              ))}
            </div>
          )}

          {/* Other Users Section */}
          {filteredNonConnectedUsers.length > 0 && (
            <div>
              <div className="p-2 text-xs font-medium text-base-content/50 bg-base-200/50">
                SUGGESTED
              </div>
              {filteredNonConnectedUsers.map((user) => (
                <UserButton
                  key={user._id}
                  user={user}
                  isOnline={onlineUsers.includes(user._id)}
                  isSelected={selectedUser?._id === user._id}
                  onClick={() => handleUserSelect(user)}
                />
              ))}
            </div>
          )}

          {/* Empty State */}
          {filteredConnectedUsers.length === 0 &&
            filteredNonConnectedUsers.length === 0 && (
              <div className="text-center text-base-content/60 py-8 px-4">
                {searchQuery ? (
                  <>
                    <div className="size-16 rounded-2xl bg-base-200 flex items-center justify-center mx-auto mb-3">
                      <Search className="size-8 text-base-content/30" />
                    </div>
                    No users found matching "{searchQuery}"
                  </>
                ) : (
                  "No users found"
                )}
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
            onClick={() => {
              closeSidebar();
              openModal();
            }}
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

// Extracted UserButton component for cleaner code
const UserButton = ({ user, isOnline, isSelected, onClick }) => (
  <button
    onClick={onClick}
    className={`w-full p-3 flex items-center gap-3 hover:bg-base-300 transition-colors
      ${isSelected ? "bg-base-300 ring-1 ring-base-300" : ""}`}
  >
    <div className="relative">
      <img
        src={user.profilePic || "/avatar.png"}
        alt={user.fullName}
        className="size-10 rounded-full object-cover"
      />
      {isOnline && (
        <span className="absolute bottom-0 right-0 size-3 bg-green-500 rounded-full ring-2 ring-base-100" />
      )}
    </div>
    <div className="text-left min-w-0">
      <div className="font-medium truncate">{user.fullName}</div>
      <div className="text-sm text-base-content/60">
        {isOnline ? "Online" : "Offline"}
      </div>
    </div>
  </button>
);

export default Sidebar;
