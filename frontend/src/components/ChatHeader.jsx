import React from "react";
import { useSidebarStore } from "../store/useSidebarStore";
import { Menu, X } from "lucide-react";
import { useChatStore } from "../store/useChatStore";
import { useOnlineUsersStore } from "../store/useOnlineUsersStore";

const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { toggleSidebar } = useSidebarStore();
  const onlineUsers = useOnlineUsersStore((state) => state.onlineUsers);

  return (
    <header className="p-4 border-b border-base-300 bg-base-100/50">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-3">
            <div className="relative">
              <img
                src={selectedUser?.profilePic || "/avatar.png"}
                alt={selectedUser?.fullName}
                className="size-10 rounded-full object-cover"
              />
              {onlineUsers.includes(selectedUser?._id) && (
                <span className="absolute bottom-0 right-0 size-3 bg-green-500 rounded-full ring-2 ring-base-100" />
              )}
            </div>
            <div>
              <h3 className="font-medium">{selectedUser?.fullName}</h3>
              <p className="text-sm text-base-content/60">
                {onlineUsers.includes(selectedUser?._id) ? "Online" : "Offline"}
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={() => setSelectedUser(null)}
          className="btn btn-ghost btn-sm btn-circle"
        >
          <X className="size-5" />
        </button>
      </div>
    </header>
  );
};

export default ChatHeader;
