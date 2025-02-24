import React, { useEffect, useRef, useState, memo } from "react";
import { useChatStore } from "../store/useChatStore";
import ChatHeader from "./ChatHeader";
import ChatInput from "./ChatInput";
import ChatSkeleton from "./skeleton/ChatSkeleton";
import { useAuthStore } from "../store/useAuthStore";
import { formatDate } from "../lib/utils";
import { ImageOff, ArrowDown } from "lucide-react";
import { useImageModalStore } from "../store/useImageModalStore";

const ChatContainer = memo(() => {
  const { setModalImage } = useImageModalStore();
  const {
    messages,
    getMessages,
    isMessagesLoading,
    selectedUser,
    subscribeToNewMessage,
    unsubscribeFromNewMessage,
  } = useChatStore();
  const { authUser } = useAuthStore();
  const messageEndRef = useRef(null);
  const chatContainerRef = useRef(null);
  const [showScrollButton, setShowScrollButton] = useState(false);

  const handleScroll = () => {
    if (!chatContainerRef.current) return;

    const { scrollTop, scrollHeight, clientHeight } = chatContainerRef.current;
    const isScrolledUp = scrollHeight - scrollTop - clientHeight > 100;
    setShowScrollButton(isScrolledUp);
  };

  const scrollToBottom = () => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    getMessages(selectedUser._id);
    subscribeToNewMessage();
    return () => {
      unsubscribeFromNewMessage();
    };
  }, [
    selectedUser,
    getMessages,
    subscribeToNewMessage,
    unsubscribeFromNewMessage,
  ]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleImageError = (e) => {
    e.target.parentElement.innerHTML = `
      <div class="flex items-center justify-center w-full h-full bg-base-200 rounded-md">
        <ImageOff class="size-6 text-base-content/50" />
      </div>
    `;
  };

  if (isMessagesLoading)
    return (
      <div className="flex-1 flex flex-col overflow-auto bg-base-100/50">
        <ChatHeader />
        <ChatSkeleton />
        <ChatInput />
      </div>
    );

  return (
    <div className="flex-1 flex flex-col overflow-auto bg-base-100/50">
      <ChatHeader />
      <div
        ref={chatContainerRef}
        onScroll={handleScroll}
        className="flex-1 overflow-y-auto p-4 space-y-6 scroll-smooth relative"
      >
        {messages.map((message, idx) => {
          const isLastMessage = idx === messages.length - 1;
          const isSentByMe = message.senderId === authUser._id;
          const showAvatar = true;

          return (
            <div
              key={message._id}
              ref={isLastMessage ? messageEndRef : null}
              className={`chat ${isSentByMe ? "chat-end" : "chat-start"} group`}
            >
              {showAvatar && (
                <div className="chat-image avatar transition-opacity duration-200">
                  <div className="size-8 sm:size-10 rounded-full ring-2 ring-primary/10 transition-all duration-300">
                    <img
                      src={
                        isSentByMe
                          ? authUser.profilePic || "/avatar.png"
                          : selectedUser.profilePic || "/avatar.png"
                      }
                      alt="avatar"
                      className="object-cover"
                      onError={handleImageError}
                    />
                  </div>
                </div>
              )}

              <div className="chat-header mb-1 transition-opacity duration-200">
                <time className="text-[10px] sm:text-xs text-base-content/50 ml-1">
                  {formatDate(message.createdAt)}
                </time>
              </div>

              <div
                className={`chat-bubble max-w-[85%] sm:max-w-[70%] ${
                  isSentByMe
                    ? "bg-primary text-primary-content"
                    : "bg-base-200 text-base-content"
                }`}
              >
                <div className="flex flex-col gap-2">
                  {message.image && (
                    <div
                      className="relative group/image cursor-zoom-in"
                      onClick={() => setModalImage(message.image)}
                    >
                      <img
                        src={message.image}
                        alt="Attachment"
                        className="max-w-full sm:max-w-[300px] rounded-md transition-transform duration-300 
                        group-hover/image:scale-[1.02]"
                        onError={handleImageError}
                      />
                      <div
                        className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent 
                        rounded-md opacity-0 group-hover/image:opacity-100 transition-opacity duration-300"
                      />
                    </div>
                  )}
                  {message.text && (
                    <p className="break-words whitespace-pre-wrap text-sm sm:text-base">
                      {message.text}
                    </p>
                  )}
                </div>
              </div>
            </div>
          );
        })}

        {showScrollButton && (
          <button
            onClick={scrollToBottom}
            className="fixed bottom-24 right-[48%] btn btn-circle animate-bounce btn-primary btn-sm shadow-lg"
            aria-label="Scroll to bottom"
          >
            <ArrowDown className="size-4" />
          </button>
        )}
      </div>
      <ChatInput />
    </div>
  );
});

export default ChatContainer;
