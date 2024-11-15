"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Heart, MessageCircle, Send, Bookmark } from "lucide-react";
import { useRouter } from "next/navigation";

interface FeedPostProps {
  username: string;
  avatar: string;
  image: string;
  caption: string;
  likes: number;
  timestamp: string;
}

export default function FeedPost({
  username,
  avatar,
  image,
  caption,
  likes,
  timestamp,
}: FeedPostProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const router = useRouter();

  const navigateToProfile = () => {
    router.push(`/profile/${username}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-8 bg-white border rounded-lg"
    >
      <div className="flex items-center p-4">
        <button onClick={navigateToProfile} className="flex items-center">
          <img
            src={avatar}
            alt={username}
            className="w-8 h-8 mr-3 rounded-full"
          />
          <span className="font-semibold">{username}</span>
        </button>
      </div>

      <div className="relative">
        <img src={image} alt="Post" className="w-full" />
        {isLiked && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: [0, 1.2, 1] }}
            transition={{ duration: 0.3 }}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
          >
            <Heart className="w-24 h-24 text-white fill-white" />
          </motion.div>
        )}
      </div>

      <div className="p-4">
        <div className="flex justify-between mb-4">
          <div className="flex space-x-4">
            <button
              onClick={() => setIsLiked(!isLiked)}
              className="transition-transform active:scale-125"
            >
              <Heart
                className={`w-6 h-6 ${
                  isLiked ? "text-red-500 fill-red-500" : ""
                }`}
              />
            </button>
            <button className="transition-transform active:scale-125">
              <MessageCircle className="w-6 h-6" />
            </button>
            <button className="transition-transform active:scale-125">
              <Send className="w-6 h-6" />
            </button>
          </div>
          <button
            onClick={() => setIsSaved(!isSaved)}
            className="transition-transform active:scale-125"
          >
            <Bookmark
              className={`w-6 h-6 ${
                isSaved ? "text-black fill-black" : ""
              }`}
            />
          </button>
        </div>

        <div className="mb-2 font-semibold">{likes.toLocaleString()} likes</div>
        <div className="mb-2">
          <button onClick={navigateToProfile} className="font-semibold">
            {username}
          </button>{" "}
          {caption}
        </div>
        <div className="text-sm text-gray-500">{timestamp} ago</div>
      </div>
    </motion.div>
  );
}