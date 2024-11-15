"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";

interface Story {
  username: string;
  avatar: string;
  media: string[];
  isYou?: boolean;
  timestamp: string;
}

interface StoryModalProps {
  stories: Story[];
  initialStoryIndex: number;
  onClose: () => void;
}

export default function StoryModal({ stories, initialStoryIndex, onClose }: StoryModalProps) {
  const [currentStoryIndex, setCurrentStoryIndex] = useState(initialStoryIndex);
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const router = useRouter();

  const currentStory = stories[currentStoryIndex];
  const STORY_DURATION = 20000; // 20 seconds per story
  const PROGRESS_INCREMENT = 100 / (STORY_DURATION / 100); // Progress increment per 100ms

  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          if (currentMediaIndex < currentStory.media.length - 1) {
            setCurrentMediaIndex(prev => prev + 1);
            return 0;
          } else if (currentStoryIndex < stories.length - 1) {
            setCurrentStoryIndex(prev => prev + 1);
            setCurrentMediaIndex(0);
            return 0;
          } else {
            clearInterval(timer);
            onClose();
            return prev;
          }
        }
        return prev + PROGRESS_INCREMENT;
      });
    }, 100);

    return () => clearInterval(timer);
  }, [currentStoryIndex, currentMediaIndex, isPaused, currentStory.media.length, stories.length, onClose]);

  const handlePrevious = () => {
    if (currentMediaIndex > 0) {
      setCurrentMediaIndex(prev => prev - 1);
      setProgress(0);
    } else if (currentStoryIndex > 0) {
      setCurrentStoryIndex(prev => prev - 1);
      setCurrentMediaIndex(stories[currentStoryIndex - 1].media.length - 1);
      setProgress(0);
    }
  };

  const handleNext = () => {
    if (currentMediaIndex < currentStory.media.length - 1) {
      setCurrentMediaIndex(prev => prev + 1);
      setProgress(0);
    } else if (currentStoryIndex < stories.length - 1) {
      setCurrentStoryIndex(prev => prev + 1);
      setCurrentMediaIndex(0);
      setProgress(0);
    } else {
      onClose();
    }
  };

  const navigateToProfile = (e: React.MouseEvent) => {
    e.stopPropagation();
    onClose();
    router.push(`/profile/${currentStory.username}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
      onMouseDown={() => setIsPaused(true)}
      onMouseUp={() => setIsPaused(false)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={() => setIsPaused(true)}
      onTouchEnd={() => setIsPaused(false)}
    >
      <button
        onClick={onClose}
        className="absolute text-white top-4 right-4"
      >
        <X className="w-6 h-6" />
      </button>

      <button
        onClick={handlePrevious}
        className="absolute transform -translate-y-1/2 left-4 top-1/2"
      >
        <ChevronLeft className="w-8 h-8 text-white" />
      </button>

      <button
        onClick={handleNext}
        className="absolute transform -translate-y-1/2 right-4 top-1/2"
      >
        <ChevronRight className="w-8 h-8 text-white" />
      </button>

      <div className="relative w-full max-w-lg">
        <div className="absolute top-0 left-0 right-0 z-10 flex p-4">
          <div className="flex items-center gap-2 mb-4">
            <button onClick={navigateToProfile}>
              <img
                src={currentStory.avatar}
                alt={currentStory.username}
                className="w-8 h-8 rounded-full"
              />
            </button>
            <div className="flex flex-col">
              <button 
                onClick={navigateToProfile}
                className="text-sm font-semibold text-left text-white"
              >
                {currentStory.username}
              </button>
              <span className="text-xs text-white/70">{currentStory.timestamp} ago</span>
            </div>
          </div>
        </div>

        <div className="absolute top-0 left-0 right-0 z-10 flex gap-1 p-4 pt-14">
          {currentStory.media.map((_, index) => (
            <div
              key={index}
              className="h-0.5 flex-1 bg-white/30 overflow-hidden"
            >
              {index === currentMediaIndex && (
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  className="h-full bg-white"
                />
              )}
              {index < currentMediaIndex && (
                <div className="w-full h-full bg-white" />
              )}
            </div>
          ))}
        </div>

        <img
          src={currentStory.media[currentMediaIndex]}
          alt="Story"
          className="w-full h-[80vh] object-contain"
        />
      </div>
    </motion.div>
  );
}