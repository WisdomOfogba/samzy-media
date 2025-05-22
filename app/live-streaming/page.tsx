import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import VideoGrid from "@/components/video-grid"

export default function LiveStreamingPage() {
  return (
    <main className="min-h-screen pt-24 pb-20 px-4 md:px-8 lg:px-12 bg-black text-white">
      <div className="container mx-auto max-w-6xl">
        <Link href="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors">
          <ArrowLeft className="h-4 w-4" />
          Back to home
        </Link>

        <h1 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight">Live Streaming Productions</h1>
        <p className="text-lg md:text-xl max-w-2xl mb-12 text-gray-300">
          Watch our professional live streaming productions with high-quality video and audio.
        </p>

        <VideoGrid />
      </div>
    </main>
  )
}
