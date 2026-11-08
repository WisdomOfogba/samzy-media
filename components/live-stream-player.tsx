"use client";

import { useState, useEffect } from "react";
import { Radio, Calendar } from "lucide-react";

interface LiveStreamPlayerProps {
  activeYouTubeVideoId?: string | null;
  isLive?: boolean;
  title?: string;
}

export function LiveStreamPlayer({
  activeYouTubeVideoId,
  isLive = true,
  title = "Live Stream Production",
}: LiveStreamPlayerProps) {
  const [hostname, setHostname] = useState<string>("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setHostname(window.location.hostname);
    }
  }, []);

  // Offline State
  if (!isLive || !activeYouTubeVideoId) {
    return (
      <div className="w-full rounded-3xl border border-white/10 bg-zinc-900/40 p-8 md:p-16 text-center text-white backdrop-blur-xl shadow-2xl">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-purple-950/60 border border-purple-800/40 text-purple-400">
          <Calendar className="h-8 w-8" />
        </div>
        <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-purple-400 mb-3 px-3 py-1 rounded-full bg-purple-950/40 border border-purple-800/30">
          <span>Broadcast Offline</span>
        </div>
        <h2 className="text-3xl font-bold tracking-tight md:text-4xl font-heading">
          Next Broadcast Coming Soon
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-base text-zinc-300 md:text-lg leading-relaxed font-normal">
          We are currently offline. Check back soon for our next live multi-camera production, or browse our portfolio for previous recordings.
        </p>
      </div>
    );
  }

  // Live State: Side-by-side on desktop (md:grid-cols-3), stacked on mobile (flex-col)
  return (
    <div className="w-full space-y-4">
      {/* Live Badge */}
      <div className="flex items-center gap-3">
        <span className="flex h-3 w-3 relative">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
        </span>
        <span className="text-xs font-semibold uppercase tracking-wider text-red-500 flex items-center gap-1.5">
          <Radio className="h-3.5 w-3.5" /> LIVE NOW
        </span>
        {title && (
          <span className="text-sm font-medium text-zinc-300">• {title}</span>
        )}
      </div>

      <div className="flex flex-col md:grid md:grid-cols-3 gap-6 w-full">
        {/* Main Broadcast Video Embed (2 cols) */}
        <div className="w-full md:col-span-2 border border-white/10 bg-black rounded-2xl overflow-hidden shadow-2xl">
          <iframe
            src={`https://www.youtube.com/embed/${activeYouTubeVideoId}?autoplay=1&mute=0`}
            className="w-full aspect-video border-none bg-black"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title={title}
          />
        </div>

        {/* Live Chat Embed (1 col) */}
        <div className="w-full md:col-span-1 border border-white/10 bg-zinc-900/60 rounded-2xl overflow-hidden shadow-2xl backdrop-blur-md">
          {hostname ? (
            <iframe
              src={`https://www.youtube.com/live_chat?v=${activeYouTubeVideoId}&embed_domain=${hostname}`}
              className="w-full h-[500px] md:h-full min-h-[400px] border-none bg-black/60"
              title="Live Chat"
            />
          ) : (
            <div className="w-full h-[500px] md:h-full min-h-[400px] flex items-center justify-center bg-black/60 text-zinc-500 text-xs">
              Loading live chat...
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default LiveStreamPlayer;
