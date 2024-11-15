"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

const images = [
  "https://images.unsplash.com/photo-1682687220742-aba13b6e50ba",
  "https://images.unsplash.com/photo-1682687220198-88e9bdea9931",
  "https://images.unsplash.com/photo-1682687221038-404670f09ef1",
  "https://images.unsplash.com/photo-1682687220067-469c0f7ec851",
  // Add more images as needed
];

export default function ExplorePage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="p-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        {images.map((image, index) => (
          <motion.div
            key={image}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="relative aspect-square group cursor-pointer"
          >
            <img
              src={image}
              alt={`Explore ${index + 1}`}
              className="object-cover w-full h-full rounded-lg"
            />
            <div className="absolute inset-0 flex items-center justify-center transition-opacity bg-black/50 opacity-0 group-hover:opacity-100 rounded-lg">
              <div className="flex gap-4 text-white">
                <span className="flex items-center gap-1">❤️ 1.2k</span>
                <span className="flex items-center gap-1">💬 24</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}