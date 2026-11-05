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
      {/* Sentinel container reserving layout space in the hero area */}
      <div
        ref={sentinelRef}
        className="relative w-full aspect-video rounded-xl transition-all duration-300 ease-in-out overflow-hidden bg-black"
      >
        {!isSticky && (
          <video
            src={src}
            poster={poster}
            controls={controls}
            autoPlay={autoPlay}
            playsInline
            className="w-full h-full object-contain"
          >
            Your browser does not support the video tag.
          </video>
        )}
      </div>

      {/* Sticky Picture-in-Picture overlay when scrolled down */}
      {isSticky && !isDismissed && (
        <div className="fixed bottom-4 right-4 w-72 md:w-96 aspect-video rounded-lg shadow-2xl z-50 transition-all duration-300 ease-in-out overflow-hidden bg-black group border border-white/10">
          <button
            onClick={() => setIsDismissed(true)}
            className="absolute top-2 right-2 z-10 p-1 rounded-full bg-black/70 hover:bg-black text-white transition-colors"
            aria-label="Close Picture in Picture"
          >
            <X className="w-4 h-4" />
          </button>
          <video
            src={src}
            poster={poster}
            controls={controls}
            autoPlay={true}
            playsInline
            className="w-full h-full object-contain"
          >
            Your browser does not support the video tag.
          </video>
          {title && (
            <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 to-transparent p-2 text-xs text-white truncate pointer-events-none">
              {title}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default StickyVideoPlayer;

