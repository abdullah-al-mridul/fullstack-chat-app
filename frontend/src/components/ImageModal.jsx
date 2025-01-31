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
    <div
      className="fixed inset-0 z-[100] animate-in fade-in duration-200"
      onClick={closeModal}
    >
      {/* Backdrop with blur */}
      <div className="fixed inset-0 bg-base-100/80 backdrop-blur-sm" />

      {/* Close button */}
      <button
        onClick={closeModal}
        className="fixed top-6 right-6 btn btn-circle bg-base-100/20 hover:bg-base-100/40 border-none text-white z-[101]"
      >
        <X className="size-5" />
      </button>

      {/* Image container with zoom effect */}
      <div className="fixed inset-0 flex items-center justify-center p-4 z-[101]">
        <div
          className="relative max-w-[90vw] max-h-[90vh] rounded-2xl overflow-hidden ring-1 ring-base-content/10 
          animate-in zoom-in-50 duration-300"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="absolute inset-0 bg-base-100/5 backdrop-blur-sm" />
          <img
            src={modalImage}
            alt="Full size"
            className="w-full h-full object-contain relative z-10"
            onError={handleImageError}
          />
        </div>
      </div>
    </div>
  );
};

export default ImageModal;
