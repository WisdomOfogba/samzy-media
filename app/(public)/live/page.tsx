import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Sparkles } from "lucide-react";
import { connectDB } from "@/lib/mongodb";
import { SystemSetting } from "@/models/SystemSetting";
import LiveStreamPlayer from "@/components/live-stream-player";

export const metadata: Metadata = {
  title: "Live Stream | Samzy Media Production",
  description: "Watch live broadcasts, event coverage, and creative streaming productions by Samzy Media.",
};

export const revalidate = 0; // Dynamic live stream status

export default async function LivePage() {
  let activeYouTubeVideoId: string | null = null;
  let isLive = false;

  try {
    await connectDB();
    const settings = await SystemSetting.findOne({ type: "global" }).lean();
    if (settings) {
      activeYouTubeVideoId = (settings as any).activeYouTubeVideoId || null;
      isLive = Boolean((settings as any).isLive);
    }
  } catch (error) {
    console.error("Failed to query live stream status:", error);
  }

  return (
    <main className="min-h-screen pt-32 pb-24 px-4 md:px-8 lg:px-12 bg-black text-white relative overflow-hidden">
      <div className="absolute top-20 right-10 w-96 h-96 bg-purple-900/15 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto max-w-6xl relative z-10">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-zinc-400 hover:text-white mb-8 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Link>

        <div className="mb-10">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-purple-400 mb-3 px-3 py-1 rounded-full bg-purple-950/40 border border-purple-800/30">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Broadcast Engineering</span>
          </div>
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight font-heading">
            Live Broadcast
          </h1>
          <p className="text-base sm:text-lg text-zinc-300 max-w-2xl mt-3 leading-relaxed font-normal">
            Experience our live multi-camera productions, streaming broadcasts, and event coverage in high definition.
          </p>
        </div>

        <LiveStreamPlayer
          activeYouTubeVideoId={activeYouTubeVideoId}
          isLive={isLive}
          title="Samzy Media Live Event"
        />
      </div>
    </main>
  );
}
