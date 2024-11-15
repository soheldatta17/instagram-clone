"use client";

import { motion } from "framer-motion";

const suggestions = [
  {
    username: "art.gallery",
    avatar: "https://images.unsplash.com/photo-1527980965255-d3b416303d12",
    subtitle: "Followed by john.doe + 8 more",
  },
  {
    username: "travel.pics",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde",
    subtitle: "Followed by jane_smith + 3 more",
  },
  {
    username: "photo.daily",
    avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36",
    subtitle: "Follows you",
  },
];

export default function Suggestions() {
  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm font-semibold text-gray-500">
          Suggestions For You
        </span>
        <button className="text-sm font-semibold">See All</button>
      </div>

      {suggestions.map((suggestion, index) => (
        <motion.div
          key={suggestion.username}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
          className="flex items-center justify-between mb-3"
        >
          <div className="flex items-center">
            <img
              src={suggestion.avatar}
              alt={suggestion.username}
              className="w-8 h-8 mr-3 rounded-full"
            />
            <div>
              <div className="text-sm font-semibold">{suggestion.username}</div>
              <div className="text-xs text-gray-500">{suggestion.subtitle}</div>
            </div>
          </div>
          <button className="text-xs font-semibold text-blue-500">Follow</button>
        </motion.div>
      ))}
    </div>
  );
}