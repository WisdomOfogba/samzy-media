"use client";

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
  const domain =
    process.env.NEXT_PUBLIC_DOMAIN ||
    (typeof window !== "undefined" ? window.location.hostname : "localhost");

  // Offline State
  if (!isLive || !activeYouTubeVideoId) {
    return (
      <div className="w-full rounded-none border border-zinc-800 bg-zinc-950 p-8 md:p-16 text-center text-white">
        <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-none border border-zinc-800 bg-zinc-900 text-zinc-400">
          <Calendar className="h-6 w-6" />
        </div>
        <div className="text-xs font-mono uppercase tracking-widest text-zinc-500 mb-2">
          <span>[ Status: Offline ]</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-bold tracking-tight uppercase font-heading">
          Next Broadcast Coming Soon
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-sm sm:text-base text-zinc-400 leading-relaxed font-normal">
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
        <span className="flex h-2.5 w-2.5 relative">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
        </span>
        <span className="text-xs font-mono font-semibold uppercase tracking-widest text-red-500 flex items-center gap-1.5">
          <Radio className="h-3.5 w-3.5" /> LIVE TRANSMISSION
        </span>
        {title && (
          <span className="text-xs font-mono text-zinc-400 truncate">• {title}</span>
        )}
      </div>

      <div className="flex flex-col md:grid md:grid-cols-3 gap-6 w-full">
        {/* Main Broadcast Video Embed (2 cols) */}
        <div className="w-full md:col-span-2 border border-zinc-800 bg-black rounded-none overflow-hidden">
          <iframe
            src={`https://www.youtube.com/embed/${activeYouTubeVideoId}?autoplay=1&mute=0`}
            className="w-full aspect-video border-none bg-black"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title={title}
          />
        </div>

        {/* Live Chat Embed (1 col) */}
        <div className="w-full md:col-span-1 border border-zinc-800 bg-zinc-950 rounded-none overflow-hidden">
          <iframe
            src={`https://www.youtube.com/live_chat?v=${activeYouTubeVideoId}&embed_domain=${domain}`}
            className="w-full h-[500px] md:h-full min-h-[400px] border-none bg-black/60"
            title="Live Chat"
          />
        </div>
      </div>
    </div>
  );
}

export default LiveStreamPlayer;
