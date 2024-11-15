"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

interface Activity {
  id: number;
  username: string;
  avatar: string;
  action: string;
  target: string;
  timestamp: string;
}

const activities: Activity[] = [
  {
    id: 1,
    username: "john.doe",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde",
    action: "liked",
    target: "your photo",
    timestamp: "2m"
  },
  {
    id: 2,
    username: "art.gallery",
    avatar: "https://images.unsplash.com/photo-1527980965255-d3b416303d12",
    action: "started following",
    target: "you",
    timestamp: "1h"
  },
  {
    id: 3,
    username: "travel.pics",
    avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36",
    action: "mentioned",
    target: "you in a comment",
    timestamp: "3h"
  },
  {
    id: 4,
    username: "photo.daily",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80",
    action: "liked",
    target: "your comment",
    timestamp: "5h"
  }
];

export default function ActivityPage() {
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
    <div className="max-w-2xl px-4 mx-auto">
      <h1 className="mb-6 text-2xl font-bold">Activity</h1>
      <div className="space-y-4">
        {activities.map((activity, index) => (
          <motion.div
            key={activity.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center p-4 bg-white border rounded-lg"
          >
            <img
              src={activity.avatar}
              alt={activity.username}
              className="w-10 h-10 mr-4 rounded-full"
            />
            <div className="flex-grow">
              <p className="text-sm">
                <span className="font-semibold">{activity.username}</span>{" "}
                {activity.action}{" "}
                <span className="font-semibold">{activity.target}</span>
              </p>
              <p className="text-xs text-gray-500">{activity.timestamp} ago</p>
            </div>
            {activity.action === "started following" && (
              <button className="px-4 py-1.5 text-sm font-semibold text-white bg-blue-500 rounded-lg hover:bg-blue-600">
                Follow Back
              </button>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}