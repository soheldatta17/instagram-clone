"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ImageIcon, Loader2 } from "lucide-react";

export default function CreatePage() {
  const [dragActive, setDragActive] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file: File) => {
    setUploading(true);
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
      setUploading(false);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="max-w-2xl px-4 mx-auto">
      <h1 className="mb-6 text-2xl font-bold">Create New Post</h1>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="overflow-hidden bg-white border rounded-lg"
      >
        {!preview ? (
          <div
            className={`p-8 text-center ${
              dragActive ? "bg-blue-50" : "bg-white"
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            {uploading ? (
              <Loader2 className="w-12 h-12 mx-auto mb-4 animate-spin text-blue-500" />
            ) : (
              <ImageIcon className="w-12 h-12 mx-auto mb-4 text-gray-400" />
            )}
            <p className="mb-2 text-xl font-semibold">
              Drag photos and videos here
            </p>
            <label className="px-4 py-2 text-sm font-semibold text-white bg-blue-500 rounded-lg cursor-pointer hover:bg-blue-600">
              Select from computer
              <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleChange}
              />
            </label>
          </div>
        ) : (
          <div className="p-4">
            <img
              src={preview}
              alt="Preview"
              className="w-full rounded-lg"
            />
            <div className="mt-4">
              <textarea
                placeholder="Write a caption..."
                className="w-full p-2 border rounded-lg resize-none focus:outline-none focus:ring-1 focus:ring-blue-500"
                rows={4}
              />
              <button className="w-full py-2 mt-4 text-sm font-semibold text-white bg-blue-500 rounded-lg hover:bg-blue-600">
                Share
              </button>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}