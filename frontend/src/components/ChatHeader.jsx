import { X } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";

const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();

  return (
    <div className="p-4 border-b border-base-content/5 backdrop-blur-xl bg-base-100/30">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Avatar with glow effect */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary opacity-20 blur-xl rounded-full" />
            <div className="relative size-12 rounded-full ring-2 ring-base-content/5 overflow-hidden">
              <img
                src={selectedUser.profilePic || "/avatar.png"}
                alt={selectedUser.fullName}
                className="size-full object-cover"
              />
            </div>
          </div>

          {/* User info */}
          <div>
            <h3 className="font-medium">{selectedUser.fullName}</h3>
            <div className="flex items-center gap-1.5">
              <span
                className={`size-2 rounded-full ${
                  onlineUsers.includes(selectedUser._id)
                    ? "bg-success animate-pulse"
                    : "bg-base-content/20"
                }`}
              />
              <span className="text-sm text-base-content/60">
                {onlineUsers.includes(selectedUser._id) ? "Online" : "Offline"}
              </span>
            </div>
          </div>
        </div>

        {/* Close button */}
        <button
          onClick={() => setSelectedUser(null)}
          className="btn btn-ghost btn-sm btn-circle hover:bg-base-content/5"
        >
          <X className="size-5" />
        </button>
      </div>
    </div>
  );
};

export default ChatHeader;
