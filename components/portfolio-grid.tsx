"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Play, X, ArrowRight } from "lucide-react";
import { useProjects } from "@/context/ProjectsContext";
import { PortfolioSkeleton } from "./Loader";
import { Card, CardContent } from "./ui/card";

interface PortfolioItem {
  _id?: string;
  id?: string;
  title: string;
  mediaUrl: string;
  thumbnail: string;
  category: string;
  type: "image" | "video";
  featured?: boolean;
  story?: string;
}

interface PortfolioGridProps {
  featured?: boolean;
  limit?: number;
  selectedCategory?: string | null;
}

function PortfolioCard({
  item,
  onOpenModal,
}: {
  item: PortfolioItem;
  onOpenModal: () => void;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (item.type === "video" && videoRef.current) {
      if (isHovered) {
        videoRef.current.play().catch(() => {});
      } else {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
      }
    }
  }, [isHovered, item.type]);

  const workId = item._id || item.id;

  return (
    <motion.div
      className="relative mb-6 break-inside-avoid rounded-xl overflow-hidden group bg-zinc-950 border border-white/5 transition-transform duration-300 hover:scale-[1.02]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative w-full overflow-hidden">
        <Image
          src={item.thumbnail || "/placeholder.jpg"}
          alt={item.title}
          width={800}
          height={600}
          className={`w-full h-auto object-cover transition-opacity duration-300 ${
            isHovered && item.type === "video" ? "opacity-0" : "opacity-100"
          }`}
        />

        {item.type === "video" && (
          <video
            ref={videoRef}
            src={item.mediaUrl}
            muted
            loop
            playsInline
            preload="none"
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
              isHovered ? "opacity-100" : "opacity-0"
            }`}
          />
        )}

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent opacity-95 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5">
          <div className="text-[11px] font-semibold text-purple-400 uppercase tracking-wider mb-1">
            {item.category}
          </div>
          <h3 className="text-base sm:text-lg font-bold text-white line-clamp-2 leading-snug">
            {item.title}
          </h3>

          <div className="mt-3 flex items-center gap-2 pt-1 opacity-90 group-hover:opacity-100 transition-opacity">
            {workId && (
              <Link
                href={`/portfolio/${workId}`}
                onClick={(e) => e.stopPropagation()}
                className="inline-flex items-center gap-1 text-xs font-medium text-zinc-200 hover:text-white bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-full transition-colors"
              >
                <span>Case Study</span>
                <ArrowRight className="h-3 w-3" />
              </Link>
            )}
            <button
              onClick={onOpenModal}
              className="inline-flex items-center gap-1 text-xs font-medium text-white bg-purple-600/80 hover:bg-purple-600 px-3 py-1.5 rounded-full transition-colors"
              aria-label={`Preview ${item.title}`}
            >
              {item.type === "video" && <Play className="h-3 w-3 fill-current" />}
              <span>Preview</span>
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function PortfolioGrid({
  featured = false,
  limit,
  selectedCategory,
}: PortfolioGridProps) {
  const { projects: mediaItems, loading } = useProjects();
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);

  useEffect(() => {
    let filteredItems = (mediaItems as PortfolioItem[]) || [];

    if (featured) filteredItems = filteredItems.filter((item) => item.featured);
    if (selectedCategory)
      filteredItems = filteredItems.filter(
        (item) => item.category === selectedCategory,
      );
    if (limit) filteredItems = filteredItems.slice(0, limit);

    setItems(filteredItems);
  }, [mediaItems, featured, limit, selectedCategory]);

  if (loading) {
    return <PortfolioSkeleton />;
  }

  return (
    <>
      {/* Masonry Layout */}
      {items.length > 0 ? (
        <motion.div
          className="columns-1 sm:columns-2 lg:columns-3 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {items.map((portfolioItem, index) => (
            <PortfolioCard
              key={portfolioItem._id || portfolioItem.id || index}
              item={portfolioItem}
              onOpenModal={() => setSelectedItem(portfolioItem)}
            />
          ))}
        </motion.div>
      ) : (
        <Card className="border-dashed bg-zinc-950/40 border-white/10">
          <CardContent className="flex flex-col items-center justify-center py-16 text-center">
            <p className="text-zinc-400 mb-2">No portfolio works found</p>
            <p className="text-xs text-zinc-500">Check back soon for new projects</p>
          </CardContent>
        </Card>
      )}

      {/* Modal for Instant Preview */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            key="modal"
            className="fixed inset-0 bg-black/95 backdrop-blur-md flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="relative max-w-5xl w-full">
              <button
                onClick={() => setSelectedItem(null)}
                className="absolute -top-12 right-0 z-50 bg-white/10 hover:bg-white/20 text-white rounded-full p-2 transition-colors"
                aria-label="Close modal"
              >
                <X className="h-5 w-5" />
              </button>

              {selectedItem.type === "video" ? (
                <video
                  src={selectedItem.mediaUrl}
                  controls
                  autoPlay
                  className="w-full max-h-[75vh] rounded-xl object-contain bg-black shadow-2xl"
                />
              ) : (
                <div className="relative w-full h-[75vh] rounded-xl overflow-hidden bg-black shadow-2xl">
                  <Image
                    src={selectedItem.mediaUrl}
                    alt={selectedItem.title}
                    fill
                    className="object-contain"
                  />
                </div>
              )}

              <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-white">
                <div>
                  <h3 className="text-xl font-bold sm:text-2xl">
                    {selectedItem.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-purple-400 mt-0.5 uppercase tracking-wide">
                    {selectedItem.category}
                  </p>
                </div>

                {(selectedItem._id || selectedItem.id) && (
                  <Link
                    href={`/portfolio/${selectedItem._id || selectedItem.id}`}
                    onClick={() => setSelectedItem(null)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold bg-white text-black hover:bg-purple-600 hover:text-white transition-colors self-start sm:self-auto"
                  >
                    <span>View Full Case Study</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
