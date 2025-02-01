import React from "react";
import { X, ImageOff } from "lucide-react";
import { useImageModalStore } from "../store/useImageModalStore";

const ImageModal = () => {
  const { modalImage, closeModal } = useImageModalStore();

  if (!modalImage) return null;

  const handleImageError = (e) => {
    e.target.parentElement.innerHTML = `
      <div class="flex items-center justify-center w-full h-full bg-base-200 rounded-md">
        <ImageOff class="size-6 text-base-content/50" />
      </div>
    `;
  };

  return (
    <div className="fixed inset-0 z-[100]" onClick={closeModal}>
      {/* Backdrop with blur */}
      <div
        className="fixed inset-0 bg-base-100/80 backdrop-blur-sm opacity-0"
        style={{
          animation: "fadeIn 0.2s ease-out forwards",
        }}
      />

      {/* Close button with fade slide animation */}
      <button
        onClick={closeModal}
        className="fixed top-6 right-6 btn btn-circle bg-base-100/20 hover:bg-base-100/40 border-none text-white z-[101] opacity-0"
        style={{
          animation: "fadeSlideDown 0.3s ease-out forwards",
          animationDelay: "0.1s",
        }}
      >
        <X className="size-5" />
      </button>

      {/* Image container with zoom effect */}
      <div className="fixed inset-0 flex items-center justify-center p-4 z-[101]">
        <div
          className="relative max-w-[90vw] max-h-[90vh] rounded-2xl overflow-hidden ring-1 ring-base-content/10 opacity-0"
          onClick={(e) => e.stopPropagation()}
          style={{
            animation:
              "modalSlideIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards",
          }}
        >
          <div className="absolute inset-0 bg-base-100/5 backdrop-blur-sm" />
          <img
            src={modalImage}
            alt="Full size"
            className="w-full h-full object-contain relative z-10 opacity-0"
            onError={handleImageError}
            style={{
              animation: "fadeScale 0.3s ease-out forwards",
              animationDelay: "0.15s",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default ImageModal;
