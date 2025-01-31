import { useRef, useState, useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import { Image, Send, X, Loader2, Smile } from "lucide-react";
import { showCustomToast } from "../utils/customToast";
import EmojiPicker from "emoji-picker-react";

const ChatInput = () => {
  const [text, setText] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [isSending, setIsSending] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const fileInputRef = useRef(null);
  const emojiPickerRef = useRef(null);
  const { sendMessage } = useChatStore();

  // Handle click outside emoji picker
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        emojiPickerRef.current &&
        !emojiPickerRef.current.contains(event.target) &&
        !event.target.closest("button")?.classList.contains("emoji-btn")
      ) {
        setShowEmojiPicker(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      showCustomToast("Please select an image file");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      // 5MB limit
      showCustomToast("Image size should be less than 5MB");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!text.trim() && !imagePreview) return;

    setIsSending(true);
    try {
      await sendMessage({
        text: text.trim(),
        image: imagePreview,
      });

      // Clear form
      setText("");
      setImagePreview(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (error) {
      console.error("Failed to send message:", error);
    } finally {
      setIsSending(false);
    }
  };

  const onEmojiClick = (emojiObject) => {
    setText((prevText) => prevText + emojiObject.emoji);
  };

  return (
    <div className="p-4 w-full bg-base-200/50 backdrop-blur-lg border-t border-base-300">
      <div
        className={`overflow-hidden transition-all duration-300 ease-out ${
          imagePreview ? "max-h-28 opacity-100 mb-3" : "max-h-0 opacity-0"
        }`}
      >
        <div className="transform transition-all duration-500 ease-out pt-[10px]">
          <div className="flex items-center gap-2">
            <div className="relative group animate-in zoom-in-50 duration-500">
              <div className="relative overflow-hidden rounded-xl">
                <div className="absolute inset-0 bg-primary/10 animate-pulse" />
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-20 h-20 object-cover rounded-xl border border-base-300 
                  group-hover:border-primary transition-all duration-300 
                  group-hover:scale-[1.02] transform z-10 relative"
                  onLoad={(e) => {
                    e.target.previousSibling.classList.add("opacity-0");
                  }}
                />
              </div>
              <div className="absolute -top-2 -right-2 z-20">
                <button
                  onClick={removeImage}
                  className="w-6 h-6 rounded-full bg-base-300 hover:bg-base-content/20
                  flex items-center justify-center transition-all duration-200 
                  hover:scale-110 opacity-0 group-hover:opacity-100
                  hover:rotate-90 transform shadow-lg"
                  type="button"
                >
                  <X className="size-3.5" />
                </button>
              </div>
              <div
                className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent 
                rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              />
            </div>
          </div>
        </div>
      </div>

      <form onSubmit={handleSendMessage} className="flex items-center gap-2">
        <div className="flex-1 flex gap-2">
          <div className="relative flex-1">
            <input
              type="text"
              className="w-full input input-bordered rounded-xl bg-base-100/50 backdrop-blur 
              focus:ring-2 ring-primary/20 transition-all duration-300 
              placeholder:text-base-content/50 pr-24 sm:pr-3"
              placeholder="Type a message..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              disabled={isSending}
            />
            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
              <button
                type="button"
                className={`emoji-btn btn btn-ghost btn-sm btn-circle
                  hover:bg-base-200 transition-all duration-300
                  text-base-content/60 hover:text-primary
                  ${
                    isSending
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:scale-105"
                  }`}
                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                disabled={isSending}
              >
                <Smile className="size-5" />
              </button>
              <button
                type="button"
                className={`sm:hidden btn btn-ghost btn-sm btn-circle
                  hover:bg-base-200 transition-all duration-300
                  ${imagePreview ? "text-primary" : "text-base-content/60"}
                  ${
                    isSending
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:scale-105"
                  }`}
                onClick={() => fileInputRef.current?.click()}
                disabled={isSending}
              >
                <Image className="size-4" />
              </button>
            </div>

            {/* Emoji Picker Popup */}
            {showEmojiPicker && (
              <div
                ref={emojiPickerRef}
                className="absolute bottom-full right-0 mb-2 z-50 max-sm:fixed max-sm:bottom-[80px] max-sm:right-2 max-sm:left-2"
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-base-300 rounded-lg opacity-50 blur" />
                  {/* Mobile close button */}
                  <button
                    className="sm:hidden absolute -top-3 -right-3 z-10 btn btn-circle btn-sm bg-base-100 border-none hover:bg-base-200"
                    onClick={() => setShowEmojiPicker(false)}
                  >
                    <X className="size-4" />
                  </button>
                  <EmojiPicker
                    onEmojiClick={onEmojiClick}
                    autoFocusSearch={false}
                    theme="dark"
                    lazyLoadEmojis={true}
                    searchPlaceHolder="Search emoji..."
                    width="100%"
                    height={300}
                    skinTonesDisabled
                    searchDisabled
                    categories={[
                      "smileys_people",
                      "animals_nature",
                      "food_drink",
                      "travel_places",
                      "activities",
                      "objects",
                      "symbols",
                      "flags",
                    ]}
                  />
                </div>
              </div>
            )}
          </div>

          <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={fileInputRef}
            onChange={handleImageChange}
          />

          <button
            type="button"
            className={`hidden sm:flex btn btn-circle btn-ghost
              hover:bg-base-200 transition-all duration-300
              ${imagePreview ? "text-primary" : "text-base-content/60"}
              ${
                isSending ? "opacity-50 cursor-not-allowed" : "hover:scale-105"
              }`}
            onClick={() => fileInputRef.current?.click()}
            disabled={isSending}
          >
            <Image className="size-5" />
          </button>
        </div>
        <button
          type="submit"
          className={`btn btn-circle ${
            text.trim() || imagePreview
              ? "btn-primary hover:scale-105"
              : "btn-ghost text-base-content/60"
          } transition-all duration-300`}
          disabled={(!text.trim() && !imagePreview) || isSending}
        >
          {isSending ? (
            <Loader2 className="size-5 animate-spin" />
          ) : (
            <Send className="size-5" />
          )}
        </button>
      </form>
    </div>
  );
};

export default ChatInput;
