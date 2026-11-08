"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Radio, ExternalLink, Check, AlertCircle, Eye, Sparkles } from "lucide-react";

export default function AdminLiveStreamPage() {
  const [videoId, setVideoId] = useState("");
  const [isLive, setIsLive] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  // Helper to extract clean 11-char YouTube ID from any URL or raw ID
  const parseYouTubeId = (input: string): string => {
    const trimmed = input.trim();
    if (!trimmed) return "";

    const urlPattern =
      /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?|live)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
    const match = trimmed.match(urlPattern);

    if (match && match[1]) {
      return match[1];
    }

    return trimmed;
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const res = await fetch("/api/settings/live");
      if (res.ok) {
        const data = await res.json();
        setVideoId(data.activeYouTubeVideoId || "");
        setIsLive(Boolean(data.isLive));
      }
    } catch (err) {
      console.error("Error fetching live settings:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setStatusMessage(null);

    const cleanVideoId = parseYouTubeId(videoId);

    try {
      const res = await fetch("/api/settings/live", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          activeYouTubeVideoId: cleanVideoId ? cleanVideoId : null,
          isLive: Boolean(isLive),
        }),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.error || "Failed to update live stream status");
      }

      setVideoId(cleanVideoId);
      setStatusMessage({
        type: "success",
        text: "Live stream configuration saved successfully.",
      });
    } catch (err: any) {
      setStatusMessage({
        type: "error",
        text: err.message || "Failed to save settings.",
      });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="py-24 flex flex-col items-center justify-center text-zinc-400 text-sm">
        <Radio className="w-6 h-6 animate-pulse text-purple-400 mb-3" />
        <span>Loading live broadcast settings...</span>
      </div>
    );
  }

  const cleanPreviewId = parseYouTubeId(videoId);

  return (
    <div className="space-y-8 max-w-4xl">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-950/60 border border-purple-800/40 text-xs font-medium text-purple-300 mb-2">
            <Sparkles className="w-3 h-3" />
            <span>Broadcast Operations</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-bold tracking-tight text-white font-heading">
            Live Broadcast
          </h1>
          <p className="text-sm text-zinc-400 mt-1">
            Configure your active YouTube stream and toggle visibility on the public broadcast page.
          </p>
        </div>

        <Link
          href="/live"
          target="_blank"
          className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-white bg-white/10 hover:bg-white/20 border border-white/10 transition-all rounded-full self-start sm:self-auto backdrop-blur-md shadow-md"
        >
          <span>View Live Page</span>
          <ExternalLink className="w-3.5 h-3.5 text-purple-400" />
        </Link>
      </div>

      {statusMessage && (
        <div
          className={`p-4 border rounded-2xl text-xs flex items-center gap-3 backdrop-blur-md ${
            statusMessage.type === "success"
              ? "bg-emerald-950/30 border-emerald-800/50 text-emerald-300"
              : "bg-red-950/30 border-red-800/50 text-red-300"
          }`}
        >
          {statusMessage.type === "success" ? (
            <Check className="w-4 h-4 shrink-0 text-emerald-400" />
          ) : (
            <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
          )}
          <span>{statusMessage.text}</span>
        </div>
      )}

      {/* Main Settings Card */}
      <form onSubmit={handleSave} className="space-y-6">
        <div className="bg-zinc-900/60 backdrop-blur-2xl border border-white/10 p-6 md:p-8 rounded-3xl space-y-6 shadow-2xl shadow-purple-950/30">
          {/* Status Indicator Bar */}
          <div className="flex items-center justify-between p-5 bg-zinc-800/50 border border-white/10 rounded-2xl">
            <div className="flex items-center gap-3.5">
              <span className="flex h-3.5 w-3.5 relative">
                {isLive ? (
                  <>
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-red-500" />
                  </>
                ) : (
                  <span className="inline-flex rounded-full h-3.5 w-3.5 bg-zinc-600" />
                )}
              </span>
              <div>
                <div className="text-sm font-semibold text-white flex items-center gap-2">
                  <span>Stream Status:</span>
                  <span
                    className={
                      isLive ? "text-red-400 font-bold" : "text-zinc-400 font-medium"
                    }
                  >
                    {isLive ? "LIVE NOW" : "OFFLINE"}
                  </span>
                </div>
                <div className="text-xs text-zinc-400 mt-0.5">
                  {isLive
                    ? "The stream player is active on the public /live route."
                    : "The public page displays the upcoming event placeholder."}
                </div>
              </div>
            </div>

            {/* Toggle Switch */}
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={isLive}
                onChange={(e) => setIsLive(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-12 h-6 bg-zinc-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-zinc-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-purple-600 peer-checked:to-pink-600" />
            </label>
          </div>

          {/* YouTube Video ID or URL Input */}
          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-zinc-300 block">
              YouTube Video ID or Stream URL
            </label>
            <input
              type="text"
              placeholder="e.g. dQw4w9WgXcQ or https://www.youtube.com/watch?v=..."
              value={videoId}
              onChange={(e) => setVideoId(e.target.value)}
              className="w-full bg-zinc-800/60 border border-white/10 text-zinc-100 placeholder:text-zinc-500 text-sm px-4 py-3.5 rounded-xl focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all font-sans"
            />
            <p className="text-xs text-zinc-400">
              Paste the 11-character video ID, full YouTube watch URL, or YouTube live URL. The system automatically extracts the video ID.
            </p>
          </div>

          {/* Live Video Preview Box */}
          {cleanPreviewId && (
            <div className="space-y-3 pt-3 border-t border-white/10">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-purple-300">
                <Eye className="w-4 h-4" />
                <span>Stream Preview (ID: {cleanPreviewId})</span>
              </div>
              <div className="relative aspect-video max-w-xl bg-black border border-white/10 rounded-2xl overflow-hidden shadow-xl">
                <iframe
                  src={`https://www.youtube.com/embed/${cleanPreviewId}`}
                  className="w-full h-full border-none"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title="Stream Preview"
                />
              </div>
            </div>
          )}

          {/* Save Action */}
          <div className="pt-4 flex items-center justify-between border-t border-white/10">
            <span className="text-xs text-zinc-400">
              Changes take effect immediately on public live broadcasts.
            </span>
            <button
              type="submit"
              disabled={saving}
              className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-semibold text-xs uppercase tracking-wider transition-all rounded-full shadow-lg shadow-purple-950/40 hover:scale-105 disabled:opacity-50"
            >
              {saving ? "Saving Changes..." : "Save Stream Settings"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

