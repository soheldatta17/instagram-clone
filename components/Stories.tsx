"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import StoryModal from "./StoryModal";
import { useRouter } from "next/navigation";

const stories = [
  {
    username: "your_story",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
    media: [
      "https://images.unsplash.com/photo-1600880292203-757bb62b4baf",
      "https://images.unsplash.com/photo-1682687220742-aba13b6e50ba"
    ],
    isYou: true
  },
  {
    username: "john.doe",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde",
    media: [
      "https://images.unsplash.com/photo-1682687220198-88e9bdea9931",
      "https://images.unsplash.com/photo-1682687221038-404670f09ef1"
    ]
  },
  {
    username: "jane_smith",
    avatar: "https://images.unsplash.com/photo-1527980965255-d3b416303d12",
    media: ["https://images.unsplash.com/photo-1682687220067-469c0f7ec851"]
  },
  {
    username: "travel_mike",
    avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36",
    media: ["https://images.unsplash.com/photo-1682687220198-88e9bdea9931"]
  },
  {
    username: "photo.lisa",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80",
    media: ["https://images.unsplash.com/photo-1682687221038-404670f09ef1"]
  }
];

export default function Stories() {
  const [selectedStoryIndex, setSelectedStoryIndex] = useState<number | null>(null);
  const router = useRouter();

  const handleProfileClick = (username: string, e: React.MouseEvent) => {
    e.stopPropagation();
    router.push(`/profile/${username}`);
  };

  return (
    <>
      <div className="p-4 mb-8 bg-white border rounded-lg">
        <div className="flex gap-4 overflow-x-auto">
          {stories.map((story, index) => (
            <motion.button
              key={story.username}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="flex flex-col items-center flex-shrink-0"
              onClick={() => setSelectedStoryIndex(index)}
            >
              <div className="p-1 rounded-full bg-gradient-to-tr from-yellow-400 to-pink-500">
                <div className="p-0.5 bg-white rounded-full">
                  <img
                    src={story.avatar}
                    alt={story.username}
                    className="w-16 h-16 rounded-full"
                    onClick={(e) => handleProfileClick(story.username, e)}
                  />
                </div>
              </div>
              <span className="mt-1 text-xs">
                {story.isYou ? "Your story" : story.username}
              </span>
            </motion.button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedStoryIndex !== null && (
          <StoryModal
            stories={stories}
            initialStoryIndex={selectedStoryIndex}
            onClose={() => setSelectedStoryIndex(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}