"use client";

import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";

interface StickyVideoPlayerProps {
  src: string;
  poster?: string;
  title?: string;
  autoPlay?: boolean;
  controls?: boolean;
  className?: string;
}

export function StickyVideoPlayer({
  src,
  poster,
  title,
  autoPlay = false,
  controls = true,
  className = "",
}: StickyVideoPlayerProps) {
  const sentinelRef = useRef<HTMLDivElement>(null);
  const [isSticky, setIsSticky] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const outOfView = !entry.isIntersecting;
        setIsSticky(outOfView);
        // Reset dismissal when user scrolls back to the top/hero video
        if (!outOfView) {
          setIsDismissed(false);
        }
      },
      {
        root: null,
        threshold: 0.1,
      }
    );

    observer.observe(sentinel);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div className={`relative w-full ${className}`}>
      {/* Sentinel container reserving exact aspect-ratio space in the document flow */}
      <div
        ref={sentinelRef}
        className="relative w-full aspect-video rounded-sm overflow-hidden bg-zinc-950 border border-zinc-800"
      >
        {/*
          CRITICAL FIX: The <video> element remains PERMANENTLY mounted.
          CSS class toggling moves the exact same element to the corner when scrolled out of view.
        */}
        <div
          className={`transition-all duration-300 ease-in-out ${
            isSticky
              ? isDismissed
                ? "hidden"
                : "fixed bottom-6 right-6 w-72 md:w-96 aspect-video z-50 shadow-2xl border border-zinc-800 bg-black rounded-sm overflow-hidden group"
              : "relative w-full h-full"
          }`}
        >
          {isSticky && !isDismissed && (
            <button
              onClick={() => setIsDismissed(true)}
              className="absolute top-2 right-2 z-20 p-1 bg-black/80 hover:bg-black text-zinc-300 hover:text-white border border-zinc-700/60 rounded-none transition-colors"
              aria-label="Close floating video"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}

          <video
            src={src}
            poster={poster}
            controls={controls}
            autoPlay={autoPlay}
            playsInline
            disablePictureInPicture
            className="w-full h-full object-contain bg-black"
          >
            Your browser does not support the video tag.
          </video>

          {isSticky && !isDismissed && title && (
            <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-2 text-[11px] font-mono text-zinc-300 truncate pointer-events-none">
              {title}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default StickyVideoPlayer;
