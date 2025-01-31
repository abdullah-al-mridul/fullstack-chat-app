import React, { useEffect, useState } from "react";
import SidebarSkeleton from "../components/skeleton/SidebarSkeleton";
import { useChatStore } from "../store/useChatStore";
import { Users } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
const Sidebar = () => {
  const { users, getUsers, selectedUser, setSelectedUser, isUserLoading } =
    useChatStore();
  const { onlineUsers } = useAuthStore();
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);
  useEffect(() => {
    getUsers();
  }, [getUsers]);
  const filteredUsers = showOnlineOnly
    ? users.filter((user) => onlineUsers.includes(user._id))
    : users;
  if (isUserLoading) return <SidebarSkeleton />;
  return (
    <aside className=" h-full w-20 lg:w-72 border-r border-base-300 flex flex-col transition-all duration-200">
      <div className=" border-b border-base-300 w-full p-5">
        <div className=" flex items-center gap-2">
          <Users className=" size-6" />
          <span className=" font-medium hidden lg:block">Contacts</span>
        </div>
        <div className=" mt-3 hidden lg:flex items-center gap-2">
          <label
            htmlFor="onlineOnly"
            className=" cursor-pointer flex items-center gap-2"
          >
            <input
              type="checkbox"
              checked={showOnlineOnly}
              onChange={() => setShowOnlineOnly(!showOnlineOnly)}
              id="onlineOnly"
              className=" checkbox checkbox-sm"
            />
            <span className=" text-sm">Online only</span>
          </label>
          <span className=" text-xs text-zinc-500">
            {onlineUsers.length - 1} online
          </span>
        </div>
      </div>
      <div className=" overflow-y-auto w-full py-3">
        {filteredUsers.map((user) => (
          <button
            key={user._id}
            onClick={() => setSelectedUser(user)}
            className={`w-full p-3 flex items-center gap-3 hover:bg-base-300 transition-colors ${
              selectedUser?._id === user._id
                ? "bg-base-300 ring-1 ring-base-300"
                : ""
            }`}
          >
            <div className=" relative mx-auto lg:mx-0">
              <img
                src={user.profilePic || "/avatar.png"}
                alt={user.fullName}
                className=" size-10 rounded-full object-cover"
              />
              {onlineUsers.includes(user._id) && (
                <span className=" absolute bottom-0 right-0 size-3 bg-green-500 rounded-full ring-2 ring-zinc-900 "></span>
              )}
            </div>
            <div className=" hidden lg:block text-left min-w-0 ">
              <div className=" font-medium truncate ">{user.fullName}</div>
              <div className=" text-sm text-zinc-600 ">
                {onlineUsers.includes(user._id) ? "Online" : "Offline"}
              </div>
            </div>
          </button>
        ))}
        {filteredUsers.length === 0 && (
          <div className=" text-center text-zinc-500 py-4">No users found</div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
