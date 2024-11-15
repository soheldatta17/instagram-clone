"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { X, Camera, Image, Loader2 } from "lucide-react";

interface CreateStoryModalProps {
  onClose: () => void;
  onStoryCreate: (media: string) => void;
}

export default function CreateStoryModal({ onClose, onStoryCreate }: CreateStoryModalProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setIsUploading(true);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
        setIsUploading(false);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleSubmit = () => {
    if (preview) {
      onStoryCreate(preview);
      onClose();
    }
  };

  // Simulated camera capture
  const handleCameraCapture = () => {
    setIsUploading(true);
    // Simulate camera capture with a random image
    const randomId = Math.floor(Math.random() * 10) + 1;
    const randomImage = `https://images.unsplash.com/photo-168268722${randomId}038-404670f09ef${randomId}`;
    setTimeout(() => {
      setPreview(randomImage);
      setIsUploading(false);
    }, 1000);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
    >
      <div className="relative w-full max-w-lg bg-white rounded-lg">
        <button
          onClick={onClose}
          className="absolute p-2 text-gray-500 top-2 right-2 hover:text-gray-700"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="p-4">
          <h2 className="mb-4 text-xl font-semibold text-center">Create Story</h2>

          {!preview ? (
            <div className="space-y-4">
              <button
                onClick={handleCameraCapture}
                className="flex items-center justify-center w-full gap-2 p-4 text-white transition-colors bg-blue-500 rounded-lg hover:bg-blue-600"
              >
                <Camera className="w-6 h-6" />
                Take Photo
              </button>

              <button
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center justify-center w-full gap-2 p-4 transition-colors bg-gray-100 rounded-lg hover:bg-gray-200"
              >
                <Image className="w-6 h-6" />
                Upload from Gallery
              </button>

              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileSelect}
                accept="image/*"
                className="hidden"
              />
            </div>
          ) : (
            <div className="space-y-4">
              <div className="relative aspect-square">
                <img
                  src={preview}
                  alt="Story preview"
                  className="object-cover w-full h-full rounded-lg"
                />
              </div>
              <button
                onClick={handleSubmit}
                className="w-full p-3 text-white transition-colors bg-blue-500 rounded-lg hover:bg-blue-600"
              >
                Share to Story
              </button>
            </div>
          )}

          {isUploading && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-lg">
              <Loader2 className="w-8 h-8 text-white animate-spin" />
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}