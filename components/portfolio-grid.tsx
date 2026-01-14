"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Play, X } from "lucide-react";
import { MediaItem } from "@/lib/data";
import { useProjects } from "@/context/ProjectsContext";
import { PortfolioSkeleton } from "./Loader";

interface PortfolioGridProps {
  featured?: boolean;
  limit?: number;
  selectedCategory?: string | null;
}

export default function PortfolioGrid({
  featured = false,
  limit,
  selectedCategory,
}: PortfolioGridProps) {
  const { projects: mediaItems, loading } = useProjects();
  const [items, setItems] = useState<MediaItem[]>([]);
  const [selectedItem, setSelectedItem] = useState<MediaItem | null>(null);

  useEffect(() => {
    let filteredItems = mediaItems;

    if (featured) filteredItems = filteredItems.filter((item) => item.featured);
    if (selectedCategory)
      filteredItems = filteredItems.filter(
        (item) => item.category === selectedCategory
      );
    if (limit) filteredItems = filteredItems.slice(0, limit);

    setItems(filteredItems);
  }, [mediaItems, featured, limit, selectedCategory]);

  if (loading) {
    return <PortfolioSkeleton />;
  }

  return (
    <>
      {/* Pinterest-style Masonry Layout */}
      <motion.div
        className="columns-1 sm:columns-2 lg:columns-3 gap-5 space-y-5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {items.map((portfolioItem, index) => (
          <motion.div
            key={index}
            className="relative mb-5 break-inside-avoid rounded-xl overflow-hidden cursor-pointer group"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
            onClick={() => setSelectedItem(portfolioItem)}
          >
            <Image
              src={portfolioItem.thumbnail || "/placeholder.jpg"}
              alt={portfolioItem.title}
              width={800}
              height={600}
              className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 sm:p-6">
              <div className="text-[10px] sm:text-xs font-medium text-purple-400 uppercase tracking-wider mb-1">
                {portfolioItem.category}
              </div>
              <h3 className="text-base sm:text-lg font-semibold text-white line-clamp-1">
                {portfolioItem.title}
              </h3>

              {/* Play Icon for Video */}
              {portfolioItem.type === "video" && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedItem(portfolioItem);
                  }}
                  className="mt-3 h-9 w-9 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-colors"
                >
                  <Play className="h-5 w-5 text-white" />
                </button>
              )}
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Modal for Preview */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            key="modal"
            className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="relative max-w-5xl w-full">
              <button
                onClick={() => setSelectedItem(null)}
                className="absolute top-3 right-3 z-50 bg-black/50 hover:bg-black/70 text-white rounded-full p-2"
              >
                <X className="h-5 w-5" />
              </button>

              {selectedItem.type === "video" ? (
                <video
                  src={selectedItem.mediaUrl}
                  controls
                  autoPlay
                  className="w-full h-[80vh] rounded-lg object-contain"
                />
              ) : (
                <Image
                  src={selectedItem.mediaUrl}
                  alt={selectedItem.title}
                  width={1200}
                  height={800}
                  className="w-full h-[80vh] rounded-lg object-contain"
                />
              )}

              <div className="mt-4 text-center text-white">
                <h3 className="text-xl font-bold sm:text-2xl">
                  {selectedItem.title}
                </h3>
                <p className="text-xs sm:text-sm text-gray-300 mt-1 uppercase tracking-wide">
                  {selectedItem.category}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
