"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Play, X, ArrowRight, Sparkles } from "lucide-react";
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

function PortfolioGridCard({
  item,
  index,
  onOpenModal,
}: {
  item: PortfolioItem;
  index: number;
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
      className="relative rounded-2xl overflow-hidden group bg-zinc-900/60 border border-white/10 transition-all duration-300 hover:border-purple-500/40 hover:shadow-2xl hover:shadow-purple-950/30 flex flex-col justify-between"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
    >
      {/* Strict 16:9 Aspect-Video Media Thumbnail */}
      <div className="relative w-full aspect-video overflow-hidden bg-black border-b border-white/10">
        <Image
          src={item.thumbnail || "/placeholder.jpg"}
          alt={item.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className={`object-cover w-full h-full transition-transform duration-700 group-hover:scale-105 ${
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
            disablePictureInPicture
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
              isHovered ? "opacity-100" : "opacity-0"
            }`}
          />
        )}

        {/* Video indicator badge */}
        {item.type === "video" && !isHovered && (
          <div className="absolute top-3 right-3 p-1.5 bg-black/70 border border-white/10 rounded-full text-white backdrop-blur-md">
            <Play className="w-3 h-3 fill-current" />
          </div>
        )}

        {/* Category & Featured Badges */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-purple-300 bg-purple-950/80 px-2.5 py-0.5 rounded-full border border-purple-800/40 backdrop-blur-md">
            {item.category}
          </span>
          {item.featured && (
            <span className="text-[10px] font-semibold uppercase tracking-wider text-amber-300 bg-amber-950/80 px-2.5 py-0.5 rounded-full border border-amber-800/40 backdrop-blur-md flex items-center gap-1">
              <Sparkles className="w-2.5 h-2.5" />
              Featured
            </span>
          )}
        </div>
      </div>

      {/* Card Details & Action Buttons */}
      <div className="p-5 flex flex-col justify-between flex-1">
        <h3 className="text-base font-bold text-white tracking-tight line-clamp-1 mb-4 font-heading group-hover:text-purple-300 transition-colors">
          {item.title}
        </h3>

        <div className="flex items-center gap-2.5 pt-1">
          {workId && (
            <Link
              href={`/portfolio/${workId}`}
              className="flex-1 inline-flex items-center justify-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-zinc-200 hover:text-white bg-white/10 hover:bg-white/20 py-2.5 px-3 rounded-full transition-all border border-white/10 backdrop-blur-md"
            >
              <span>Case Study</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          )}
          <button
            onClick={onOpenModal}
            className="inline-flex items-center justify-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-white bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 py-2.5 px-4 rounded-full transition-all shadow-md shadow-purple-950/40 hover:scale-105"
            aria-label={`Preview ${item.title}`}
          >
            <Play className="h-3 w-3 fill-current" />
            <span>Preview</span>
          </button>
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
      {/* Strict Uniform CSS Grid: 1 col on mobile, 2 cols on tablet, 3 cols on desktop */}
      {items.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((portfolioItem, index) => (
            <PortfolioGridCard
              key={portfolioItem._id || portfolioItem.id || index}
              item={portfolioItem}
              index={index}
              onOpenModal={() => setSelectedItem(portfolioItem)}
            />
          ))}
        </div>
      ) : (
        <Card className="border border-white/10 bg-white/5 rounded-2xl backdrop-blur-md">
          <CardContent className="flex flex-col items-center justify-center py-20 text-center">
            <p className="text-zinc-300 font-medium text-base mb-2">No portfolio works found</p>
            <p className="text-xs text-zinc-500">Check back soon for new releases</p>
          </CardContent>
        </Card>
      )}

      {/* Modal for Instant Preview */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            key="modal"
            className="fixed inset-0 bg-black/95 backdrop-blur-2xl flex items-center justify-center z-50 p-4 sm:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="relative max-w-5xl w-full bg-zinc-950/90 border border-white/15 rounded-3xl p-5 md:p-8 shadow-2xl shadow-purple-950/50 backdrop-blur-2xl">
              <button
                onClick={() => setSelectedItem(null)}
                className="absolute top-5 right-5 z-50 bg-white/10 hover:bg-white/20 border border-white/10 text-white p-2.5 rounded-full transition-colors backdrop-blur-md"
                aria-label="Close modal"
              >
                <X className="h-4 w-4" />
              </button>

              {selectedItem.type === "video" ? (
                <div className="relative w-full aspect-video bg-black overflow-hidden rounded-2xl border border-white/10 shadow-2xl">
                  <video
                    src={selectedItem.mediaUrl}
                    controls
                    autoPlay
                    disablePictureInPicture
                    className="w-full h-full object-contain"
                  />
                </div>
              ) : (
                <div className="relative w-full aspect-video overflow-hidden bg-black rounded-2xl border border-white/10 shadow-2xl">
                  <Image
                    src={selectedItem.mediaUrl}
                    alt={selectedItem.title}
                    fill
                    className="object-contain"
                  />
                </div>
              )}

              <div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 text-white">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-purple-400">
                    {selectedItem.category}
                  </span>
                  <h3 className="text-xl md:text-3xl font-bold tracking-tight mt-1 font-heading">
                    {selectedItem.title}
                  </h3>
                </div>

                {(selectedItem._id || selectedItem.id) && (
                  <Link
                    href={`/portfolio/${selectedItem._id || selectedItem.id}`}
                    onClick={() => setSelectedItem(null)}
                    className="inline-flex items-center gap-2 px-6 py-3 text-xs font-semibold uppercase tracking-wider bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white transition-all rounded-full self-start sm:self-auto shadow-lg shadow-purple-950/40 hover:scale-105"
                  >
                    <span>View Case Study</span>
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
