import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
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
    <main className="min-h-screen pt-28 pb-20 px-4 md:px-8 lg:px-12 bg-black text-white">
      <div className="container mx-auto max-w-6xl">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-zinc-400 hover:text-white mb-8 transition-colors text-sm"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to home
        </Link>

        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white">
            Live Broadcast
          </h1>
          <p className="text-zinc-400 mt-2 text-base md:text-lg">
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

