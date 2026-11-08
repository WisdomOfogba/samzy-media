"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
  const mainVideoRef = useRef<HTMLVideoElement>(null);
  const pipVideoRef = useRef<HTMLVideoElement>(null);

  const [isSticky, setIsSticky] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  // Monitor when the main video scrolls out of the viewport
  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const outOfView = !entry.isIntersecting;
        setIsSticky(outOfView);

        // Reset dismissal when user scrolls back to the main video
        if (!outOfView) {
          setIsDismissed(false);
        }
      },
      {
        root: null,
        threshold: 0.15,
      }
    );

    observer.observe(sentinel);

    return () => {
      observer.disconnect();
    };
  }, []);

  // Sync playback time between main video and floating PiP
  useEffect(() => {
    if (isSticky && !isDismissed && pipVideoRef.current && mainVideoRef.current) {
      pipVideoRef.current.currentTime = mainVideoRef.current.currentTime;
      if (!mainVideoRef.current.paused) {
        pipVideoRef.current.play().catch(() => {});
        mainVideoRef.current.pause();
      }
    } else if (!isSticky && mainVideoRef.current && pipVideoRef.current) {
      mainVideoRef.current.currentTime = pipVideoRef.current.currentTime;
      if (!pipVideoRef.current.paused) {
        mainVideoRef.current.play().catch(() => {});
      }
    }
  }, [isSticky, isDismissed]);

  return (
    <div className={`relative w-full ${className}`}>
      {/* 1. Main Hero Video: Stays permanently anchored in the document flow */}
      <div
        ref={sentinelRef}
        className="relative w-full aspect-video rounded-2xl overflow-hidden bg-black border border-white/10 shadow-2xl"
      >
        <video
          ref={mainVideoRef}
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
      </div>

      {/* 2. Floating PiP: Smoothly slides in from the right when scrolled past the sentinel */}
      <AnimatePresence>
        {isSticky && !isDismissed && (
          <motion.div
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0 }}
            transition={{ type: "spring", damping: 26, stiffness: 240 }}
            className="fixed bottom-6 right-6 w-72 sm:w-80 md:w-96 aspect-video z-50 rounded-2xl shadow-2xl shadow-purple-950/40 overflow-hidden border border-white/20 bg-black/90 backdrop-blur-xl group"
          >
            {/* Close / Dismiss PiP button */}
            <button
              onClick={() => setIsDismissed(true)}
              className="absolute top-2.5 right-2.5 z-20 p-1.5 rounded-full bg-black/70 hover:bg-black text-zinc-300 hover:text-white transition-colors border border-white/10 backdrop-blur-md"
              aria-label="Close Picture in Picture"
            >
              <X className="w-3.5 h-3.5" />
            </button>

            <video
              ref={pipVideoRef}
              src={src}
              poster={poster}
              controls={controls}
              autoPlay
              playsInline
              disablePictureInPicture
              className="w-full h-full object-contain bg-black"
            >
              Your browser does not support the video tag.
            </video>

            {title && (
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-2 text-xs font-medium text-white truncate pointer-events-none">
                {title}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default StickyVideoPlayer;
