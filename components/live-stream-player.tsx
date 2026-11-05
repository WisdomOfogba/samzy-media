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

  // Offline State: When stream is offline or video id is missing
  if (!isLive || !activeYouTubeVideoId) {
    return (
      <div className="w-full rounded-2xl border border-white/10 bg-white/5 p-8 md:p-16 text-center text-white backdrop-blur-sm">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-purple-900/40 text-purple-400">
          <Calendar className="h-8 w-8" />
        </div>
        <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
          Next Event Coming Soon
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-base text-gray-400 md:text-lg">
          We are currently offline. Check back soon for our next live stream
          production, or browse our portfolio for previous recordings.
        </p>
      </div>
    );
  }

  // Live State: Side-by-side on desktop (md:grid-cols-3), stacked on mobile (flex-col)
  return (
    <div className="w-full space-y-4">
      {/* Live Badge */}
      <div className="flex items-center gap-2">
        <span className="flex h-3 w-3 relative">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
        </span>
        <span className="text-xs font-semibold uppercase tracking-wider text-red-500 flex items-center gap-1">
          <Radio className="h-3.5 w-3.5" /> LIVE NOW
        </span>
        {title && (
          <span className="text-sm font-medium text-gray-300">• {title}</span>
        )}
      </div>

      <div className="flex flex-col md:grid md:grid-cols-3 gap-6 w-full">
        {/* Video Embed (Main Broadcast - spans 2 columns on desktop) */}
        <div className="w-full md:col-span-2">
          <iframe
            src={`https://www.youtube.com/embed/${activeYouTubeVideoId}?autoplay=1&mute=0`}
            className="w-full aspect-video rounded-xl shadow-lg border-none bg-black"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title={title}
          />
        </div>

        {/* Chat Embed (Interactive Comments - spans 1 column on desktop) */}
        <div className="w-full md:col-span-1">
          <iframe
            src={`https://www.youtube.com/live_chat?v=${activeYouTubeVideoId}&embed_domain=${domain}`}
            className="w-full h-[500px] md:h-full min-h-[400px] rounded-xl shadow-lg border-none bg-black/40"
            title="Live Chat"
          />
        </div>
      </div>
    </div>
  );
}

export default LiveStreamPlayer;

