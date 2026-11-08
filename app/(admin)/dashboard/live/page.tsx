"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Radio, ExternalLink, Check, AlertCircle, Play, Eye } from "lucide-react";

export default function LiveStreamAdminPage() {
  const [videoId, setVideoId] = useState("");
  const [isLive, setIsLive] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  // Helper to extract YouTube video ID from various URL formats or raw ID
  const parseYouTubeId = (input: string): string => {
    const trimmed = input.trim();
    if (!trimmed) return "";

    // Match patterns like:
    // https://www.youtube.com/watch?v=dQw4w9WgXcQ
    // https://youtu.be/dQw4w9WgXcQ
    // https://www.youtube.com/live/dQw4w9WgXcQ
    // https://www.youtube.com/embed/dQw4w9WgXcQ
    const urlPattern =
      /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?|live)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
    const match = trimmed.match(urlPattern);

    if (match && match[1]) {
      return match[1];
    }

    // Otherwise assume it's already a raw video ID
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
        text: "Live stream configuration successfully updated.",
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
      <div className="py-20 flex flex-col items-center justify-center text-zinc-500 font-mono text-xs uppercase tracking-wider">
        <Radio className="w-5 h-5 animate-pulse text-zinc-400 mb-2" />
        <span>Loading Live Settings...</span>
      </div>
    );
  }

  const cleanPreviewId = parseYouTubeId(videoId);

  return (
    <div className="space-y-8 max-w-4xl">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-zinc-800">
        <div>
          <div className="text-xs font-mono uppercase tracking-widest text-zinc-500 mb-1">
            System Settings
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold uppercase tracking-tight text-white font-heading">
            Live Stream Broadcast Control
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1">
            Configure the active YouTube stream and toggle global broadcast visibility on the live page.
          </p>
        </div>

        <Link
          href="/live"
          target="_blank"
          className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-mono uppercase tracking-wider text-zinc-300 hover:text-white bg-zinc-900 border border-zinc-800 hover:border-zinc-700 transition-colors self-start sm:self-auto rounded-none"
        >
          <span>View Public Page</span>
          <ExternalLink className="w-3.5 h-3.5 text-zinc-500" />
        </Link>
      </div>

      {statusMessage && (
        <div
          className={`p-4 border rounded-none text-xs font-mono flex items-center gap-2.5 ${
            statusMessage.type === "success"
              ? "bg-emerald-950/20 border-emerald-800/40 text-emerald-400"
              : "bg-red-950/20 border-red-800/40 text-red-400"
          }`}
        >
          {statusMessage.type === "success" ? (
            <Check className="w-4 h-4 shrink-0" />
          ) : (
            <AlertCircle className="w-4 h-4 shrink-0" />
          )}
          <span>{statusMessage.text}</span>
        </div>
      )}

      {/* Main Settings Card */}
      <form onSubmit={handleSave} className="space-y-6">
        <div className="bg-zinc-950 border border-zinc-800 p-6 md:p-8 rounded-none space-y-6">
          {/* Status Indicator Bar */}
          <div className="flex items-center justify-between p-4 bg-zinc-900/60 border border-zinc-800">
            <div className="flex items-center gap-3">
              <span className="flex h-3 w-3 relative">
                {isLive ? (
                  <>
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500" />
                  </>
                ) : (
                  <span className="inline-flex rounded-full h-3 w-3 bg-zinc-600" />
                )}
              </span>
              <div>
                <div className="text-xs font-mono uppercase tracking-wider font-semibold text-white">
                  Broadcast State: {isLive ? "ONLINE" : "OFFLINE"}
                </div>
                <div className="text-[11px] text-zinc-500 font-mono">
                  {isLive
                    ? "Live player is currently visible and active to public viewers."
                    : "Public page displays the upcoming event placeholder."}
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
              <div className="w-11 h-6 bg-zinc-800 peer-focus:outline-none rounded-none peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-zinc-300 after:border after:rounded-none after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600 border border-zinc-700" />
            </label>
          </div>

          {/* YouTube Video ID or URL Input */}
          <div className="space-y-2">
            <label className="text-xs font-mono uppercase tracking-wider text-zinc-300 block">
              YouTube Video ID or Stream URL
            </label>
            <input
              type="text"
              placeholder="e.g. dQw4w9WgXcQ or https://www.youtube.com/watch?v=..."
              value={videoId}
              onChange={(e) => setVideoId(e.target.value)}
              className="w-full bg-zinc-900 border border-zinc-800 text-zinc-100 placeholder:text-zinc-600 text-sm px-4 py-3 rounded-none focus:outline-none focus:border-zinc-500 transition-colors font-mono"
            />
            <p className="text-[11px] font-mono text-zinc-500">
              Paste the 11-character video ID, standard watch URL, or YouTube live URL. The system will automatically extract the ID.
            </p>
          </div>

          {/* Live Video Preview Box */}
          {cleanPreviewId && (
            <div className="space-y-2 pt-2 border-t border-zinc-800/80">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-zinc-400">
                <Eye className="w-3.5 h-3.5" />
                <span>Stream Preview (ID: {cleanPreviewId})</span>
              </div>
              <div className="relative aspect-video max-w-xl bg-black border border-zinc-800 overflow-hidden">
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
          <div className="pt-4 flex items-center justify-between border-t border-zinc-800">
            <span className="text-[11px] font-mono text-zinc-500">
              Changes take effect immediately on public routes
            </span>
            <button
              type="submit"
              disabled={saving}
              className="px-6 py-2.5 bg-white text-black hover:bg-zinc-200 transition-colors font-mono text-xs uppercase tracking-widest font-semibold border border-white rounded-none disabled:opacity-50"
            >
              {saving ? "Saving Changes..." : "Save Stream Settings"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

