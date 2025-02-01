import React from "react";
import { useChatStore } from "../store/useChatStore";
import Sidebar from "../components/Sidebar";
import NoChatSelected from "../components/NoChatSelected";
import ChatContainer from "../components/ChatContainer";

const HomePage = () => {
  const { selectedUser } = useChatStore();
  return (
    <div className="min-h-screen bg-gradient-to-b from-base-300/50 to-base-100">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/10 bg-[size:40px_40px] [mask-image:radial-gradient(white,transparent_90%)]" />
        <div className="absolute -top-40 -right-40 size-80 rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 size-80 rounded-full bg-secondary/20 blur-3xl" />
      </div>

      <div className="flex items-center justify-center lg:pt-20 h-full pt-[65px]">
        <div className="backdrop-blur-xl bg-base-100/50 lg:rounded-2xl border border-base-content/5 shadow-xl w-full max-w-6xl h-[calc(100vh-65px)] lg:h-[calc(100vh-8rem)]">
          <div className="flex h-full lg:rounded-2xl overflow-hidden">
            <Sidebar />
            {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
