"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import { Grid, Bookmark, User } from "lucide-react";
import { notFound } from "next/navigation";
import { profiles } from "@/lib/data";

export default function ProfileContent({ username }: { username: string }) {
  const profile = profiles[username as keyof typeof profiles];

  if (!profile) {
    notFound();
  }

  return (
    <div className="max-w-4xl px-4 mx-auto">
      <div className="flex flex-col items-center gap-8 py-8 md:flex-row md:items-start">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="flex-shrink-0"
        >
          <img
            src={profile.avatar}
            alt={profile.username}
            className="w-32 h-32 rounded-full"
          />
        </motion.div>
        <div className="flex-grow text-center md:text-left">
          <div className="flex flex-col items-center gap-4 md:flex-row">
            <h1 className="text-2xl font-semibold">{profile.username}</h1>
            <button className="px-4 py-1.5 bg-gray-100 rounded-lg hover:bg-gray-200">
              {profile.username === "your_story" ? "Edit Profile" : "Follow"}
            </button>
          </div>
          <div className="flex justify-center gap-8 my-4 md:justify-start">
            <span><b>{profile.stats.posts}</b> posts</span>
            <span><b>{profile.stats.followers.toLocaleString()}</b> followers</span>
            <span><b>{profile.stats.following}</b> following</span>
          </div>
          <p className="max-w-md whitespace-pre-line">
            {profile.bio}
          </p>
        </div>
      </div>

      <Tabs defaultValue="posts" className="mt-8">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="posts">
            <Grid className="w-4 h-4 mr-2" /> Posts
          </TabsTrigger>
          <TabsTrigger value="saved">
            <Bookmark className="w-4 h-4 mr-2" /> Saved
          </TabsTrigger>
          <TabsTrigger value="tagged">
            <User className="w-4 h-4 mr-2" /> Tagged
          </TabsTrigger>
        </TabsList>
        <TabsContent value="posts">
          <div className="grid grid-cols-3 gap-1">
            {[...Array(9)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="relative aspect-square group"
              >
                <img
                  src={`https://images.unsplash.com/photo-${1682687220000 + i}`}
                  alt={`Post ${i + 1}`}
                  className="object-cover w-full h-full"
                />
                <div className="absolute inset-0 flex items-center justify-center transition-opacity bg-black/50 opacity-0 group-hover:opacity-100">
                  <div className="flex gap-4 text-white">
                    <span>❤️ 1.2k</span>
                    <span>💬 24</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="saved">
          <div className="flex items-center justify-center h-48 text-gray-500">
            No saved posts yet
          </div>
        </TabsContent>
        <TabsContent value="tagged">
          <div className="flex items-center justify-center h-48 text-gray-500">
            No tagged posts yet
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}