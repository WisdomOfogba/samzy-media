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

function BentoCard({
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
  // Bento-box layout rhythm: certain featured or key positions span 2 columns on larger viewports
  const isWide = item.featured || index % 5 === 0;

  return (
    <motion.div
      className={`relative rounded-sm overflow-hidden group bg-zinc-900 border border-zinc-800 transition-colors duration-200 hover:border-zinc-600 flex flex-col justify-end ${
        isWide ? "md:col-span-2" : "col-span-1"
      } min-h-[320px] md:min-h-[360px]`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
    >
      {/* Background Media */}
      <div className="absolute inset-0 w-full h-full overflow-hidden bg-zinc-950">
        <Image
          src={item.thumbnail || "/placeholder.jpg"}
          alt={item.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className={`object-cover transition-transform duration-500 group-hover:scale-105 ${
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
      </div>

      {/* Stark Dark Vignette Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/60 to-transparent opacity-90 group-hover:opacity-95 transition-opacity pointer-events-none" />

      {/* Card Content & Action Bar */}
      <div className="relative z-10 p-6 flex flex-col justify-end">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 bg-zinc-950/80 px-2 py-0.5 border border-zinc-800 rounded-none">
            {item.category}
          </span>
          {item.featured && (
            <span className="text-[10px] font-mono uppercase tracking-widest text-white bg-zinc-800 px-2 py-0.5 rounded-none border border-zinc-700">
              Featured
            </span>
          )}
        </div>

        <h3 className="text-xl md:text-2xl font-bold text-white uppercase tracking-tight line-clamp-1 mb-4">
          {item.title}
        </h3>

        <div className="flex items-center gap-2 pt-1 opacity-90 group-hover:opacity-100 transition-opacity">
          {workId && (
            <Link
              href={`/portfolio/${workId}`}
              onClick={(e) => e.stopPropagation()}
              className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-black bg-white hover:bg-zinc-200 px-3.5 py-1.5 rounded-none transition-colors border border-white"
            >
              <span>Case Study</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          )}
          <button
            onClick={onOpenModal}
            className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-zinc-200 hover:text-white bg-zinc-900/90 hover:bg-zinc-800 px-3.5 py-1.5 rounded-none transition-colors border border-zinc-700"
            aria-label={`Preview ${item.title}`}
          >
            {item.type === "video" && <Play className="h-3 w-3 fill-current" />}
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
      {/* Bento-Box Grid Layout */}
      {items.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[340px]">
          {items.map((portfolioItem, index) => (
            <BentoCard
              key={portfolioItem._id || portfolioItem.id || index}
              item={portfolioItem}
              index={index}
              onOpenModal={() => setSelectedItem(portfolioItem)}
            />
          ))}
        </div>
      ) : (
        <Card className="border border-zinc-800 bg-zinc-950/60 rounded-none">
          <CardContent className="flex flex-col items-center justify-center py-20 text-center">
            <p className="text-zinc-400 font-mono text-sm uppercase tracking-wider mb-2">No portfolio works found</p>
            <p className="text-xs text-zinc-500 font-mono">Check back soon for new releases</p>
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
            <div className="relative max-w-5xl w-full bg-zinc-950 border border-zinc-800 rounded-none p-4 md:p-6 shadow-2xl">
              <button
                onClick={() => setSelectedItem(null)}
                className="absolute top-4 right-4 z-50 bg-zinc-900 border border-zinc-700 text-zinc-300 hover:text-white p-2 rounded-none transition-colors"
                aria-label="Close modal"
              >
                <X className="h-4 w-4" />
              </button>

              {selectedItem.type === "video" ? (
                <div className="relative w-full aspect-video bg-black overflow-hidden border border-zinc-850">
                  <video
                    src={selectedItem.mediaUrl}
                    controls
                    autoPlay
                    disablePictureInPicture
                    className="w-full h-full object-contain"
                  />
                </div>
              ) : (
                <div className="relative w-full aspect-video overflow-hidden bg-black border border-zinc-850">
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
                  <p className="text-xs font-mono uppercase tracking-widest text-zinc-400 mb-1">
                    {selectedItem.category}
                  </p>
                  <h3 className="text-xl md:text-2xl font-bold uppercase tracking-tight">
                    {selectedItem.title}
                  </h3>
                </div>

                {(selectedItem._id || selectedItem.id) && (
                  <Link
                    href={`/portfolio/${selectedItem._id || selectedItem.id}`}
                    onClick={() => setSelectedItem(null)}
                    className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-mono uppercase tracking-wider bg-white text-black hover:bg-zinc-200 transition-colors rounded-none self-start sm:self-auto font-semibold border border-white"
                  >
                    <span>View Case Study</span>
                    <ArrowRight className="h-3.5 w-3.5" />
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
