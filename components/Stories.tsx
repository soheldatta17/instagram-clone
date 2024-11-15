"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import StoryModal from "./StoryModal";
import CreateStoryModal from "./CreateStoryModal";
import { useRouter } from "next/navigation";

const initialStories = [
  {
    username: "your_story",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
    media: [],
    isYou: true,
    timestamp: "2h"
  },
  {
    username: "john.doe",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde",
    media: [
      "https://images.unsplash.com/photo-1682687220198-88e9bdea9931",
      "https://images.unsplash.com/photo-1682687221038-404670f09ef1"
    ],
    timestamp: "1h"
  },
  {
    username: "jane_smith",
    avatar: "https://images.unsplash.com/photo-1527980965255-d3b416303d12",
    media: ["https://images.unsplash.com/photo-1682687220067-469c0f7ec851"],
    timestamp: "3h"
  },
  {
    username: "travel_mike",
    avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36",
    media: ["https://images.unsplash.com/photo-1682687220198-88e9bdea9931"],
    timestamp: "4h"
  },
  {
    username: "photo.lisa",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80",
    media: ["https://images.unsplash.com/photo-1682687221038-404670f09ef1"],
    timestamp: "5h"
  }
];

export default function Stories() {
  const [stories, setStories] = useState(initialStories);
  const [selectedStoryIndex, setSelectedStoryIndex] = useState<number | null>(null);
  const [showCreateStory, setShowCreateStory] = useState(false);
  const router = useRouter();

  const handleImageClick = (index: number, e: React.MouseEvent) => {
    e.stopPropagation();
    if (index === 0 && stories[0].media.length === 0) {
      setShowCreateStory(true);
    } else if (stories[index].media.length > 0) {
      setSelectedStoryIndex(index);
    }
  };

  const handleUsernameClick = (e: React.MouseEvent, username: string) => {
    e.stopPropagation();
    router.push(`/profile/${username}`);
  };

  const handleStoryCreate = (media: string) => {
    const updatedStories = [...stories];
    updatedStories[0].media = [media];
    updatedStories[0].timestamp = "Just now";
    setStories(updatedStories);
  };

  return (
    <>
      <div className="p-4 mb-8 bg-white border rounded-lg">
        <div className="flex gap-4 overflow-x-auto">
          {stories.map((story, index) => (
            <motion.div
              key={story.username}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="flex flex-col items-center flex-shrink-0"
            >
              <div 
                className={`p-1 rounded-full ${
                  story.media.length > 0 || story.isYou
                    ? "bg-gradient-to-tr from-yellow-400 to-pink-500"
                    : "bg-gray-200"
                }`}
              >
                <div className="p-0.5 bg-white rounded-full">
                  <div 
                    className="relative w-16 h-16 cursor-pointer"
                    onClick={(e) => handleImageClick(index, e)}
                  >
                    <img
                      src={story.avatar}
                      alt={story.username}
                      className="w-full h-full rounded-full"
                    />
                    {story.isYou && story.media.length === 0 && (
                      <div className="absolute bottom-0 right-0 flex items-center justify-center w-6 h-6 text-white bg-blue-500 border-2 border-white rounded-full">
                        +
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <button
                className="mt-1 text-xs hover:underline"
                onClick={(e) => handleUsernameClick(e, story.username)}
              >
                {story.isYou ? "Your story" : story.username}
              </button>
            </motion.div>
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
        {showCreateStory && (
          <CreateStoryModal
            onClose={() => setShowCreateStory(false)}
            onStoryCreate={handleStoryCreate}
          />
        )}
      </AnimatePresence>
    </>
  );
}