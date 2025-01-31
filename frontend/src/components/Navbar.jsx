import React from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Link } from "react-router-dom";
import { MessagesSquare, Menu, User, Settings, LogOut } from "lucide-react";
import { useSidebarStore } from "../store/useSidebarStore";

const Navbar = () => {
  const { authUser, logout } = useAuthStore();
  const { toggleSidebar } = useSidebarStore();

  return (
    <header className="border-b border-base-300 fixed w-full top-0 z-40 backdrop-blur-lg bg-base-100/80">
      <div className="container mx-auto px-4 h-16">
        <div className="flex items-center justify-between h-full">
          <div className="flex items-center gap-4">
            <button
              onClick={toggleSidebar}
              className="lg:hidden btn btn-ghost btn-sm btn-circle"
            >
              <Menu className="size-5" />
            </button>
            <Link
              to={"/"}
              className="flex items-center gap-2.5 hover:opacity-80 transition-all"
            >
              <div className="size-9 rounded-lg bg-primary/10 flex items-center justify-center">
                <MessagesSquare className="w-5 h-5 text-primary" />
              </div>
              <h1 className="text-lg font-bold">HaloTalk</h1>
            </Link>
          </div>

          {/* Show these buttons only on larger screens */}
          <div className="flex items-center gap-2">
            {authUser && (
              <>
                <Link to={"/profile"} className="btn btn-sm gap-2">
                  <User className="size-5" />
                  <span className="hidden sm:inline">Profile</span>
                </Link>
                <div className="hidden lg:flex items-center gap-2">
                  <Link
                    to="/settings"
                    className="btn btn-sm gap-2 transition-colors"
                  >
                    <Settings className="size-4" />
                    <span className="hidden sm:inline">Settings</span>
                  </Link>
                  <button onClick={logout} className="btn btn-sm gap-2">
                    <LogOut className="size-5" />
                    <span className="hidden sm:inline">Logout</span>
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
