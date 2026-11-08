import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, Tag, Sparkles } from "lucide-react";
import mongoose from "mongoose";
import { connectDB } from "@/lib/mongodb";
import { PortfolioWork } from "@/models/Work";
import StickyVideoPlayer from "@/components/sticky-video-player";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return { title: "Work Not Found | Samzy Media" };
  }

  try {
    await connectDB();
    const work = await PortfolioWork.findById(id).lean();
    if (!work) return { title: "Work Not Found | Samzy Media" };

    return {
      title: `${(work as any).title} | Samzy Media Production`,
      description: (work as any).story?.slice(0, 160) || `Portfolio case study for ${(work as any).title}`,
    };
  } catch {
    return { title: "Portfolio Case Study | Samzy Media" };
  }
}

export default async function PortfolioDetailPage({ params }: PageProps) {
  const { id } = await params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    notFound();
  }

  await connectDB();
  const work = await PortfolioWork.findById(id).lean();

  if (!work) {
    notFound();
  }

  const workData = work as any;
  const isVideo = workData.type === "video";

  return (
    <main className="min-h-screen pt-32 pb-24 px-4 md:px-8 lg:px-12 bg-black text-white relative overflow-hidden">
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-purple-900/10 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto max-w-4xl relative z-10">
        {/* Navigation Breadcrumb */}
        <Link
          href="/portfolio"
          className="inline-flex items-center gap-2 text-sm font-medium text-zinc-400 hover:text-white mb-8 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to all works
        </Link>

        {/* Media Showcase Header with PiP support */}
        <div className="mb-10">
          {isVideo ? (
            <StickyVideoPlayer
              src={workData.mediaUrl}
              poster={workData.thumbnail}
              title={workData.title}
              controls
              autoPlay={false}
            />
          ) : (
            <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-black border border-white/10 shadow-2xl">
              <Image
                src={workData.mediaUrl || workData.thumbnail}
                alt={workData.title}
                fill
                className="object-contain"
                priority
              />
            </div>
          )}
        </div>

        {/* Project Meta Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-white/10 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-purple-950/80 text-purple-300 border border-purple-800/40 backdrop-blur-md">
                <Tag className="h-3 w-3" />
                {workData.category}
              </span>
              {workData.featured && (
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-amber-950/70 text-amber-300 border border-amber-800/40 backdrop-blur-md">
                  <Sparkles className="h-3 w-3" />
                  Featured
                </span>
              )}
            </div>
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-white font-heading">
              {workData.title}
            </h1>
          </div>

          {workData.createdAt && (
            <div className="flex items-center gap-1.5 text-xs text-zinc-400">
              <Calendar className="h-3.5 w-3.5" />
              <span>
                {new Date(workData.createdAt).toLocaleDateString("en-US", {
                  month: "short",
                  year: "numeric",
                })}
              </span>
            </div>
          )}
        </div>

        {/* Case Study Story Content */}
        <article className="space-y-6 text-zinc-300 leading-relaxed text-base md:text-lg">
          <h2 className="text-2xl font-bold text-white tracking-tight font-heading">
            The Story Behind the Design
          </h2>

          {workData.story ? (
            <div className="whitespace-pre-line bg-zinc-900/50 p-6 md:p-8 rounded-2xl border border-white/10 text-zinc-300 leading-relaxed font-sans shadow-xl">
              {workData.story}
            </div>
          ) : (
            <div className="p-8 rounded-2xl border border-white/10 bg-zinc-900/40 text-center text-zinc-400">
              <p>
                This creative production showcases our specialized craftsmanship in{" "}
                <span className="text-purple-400 font-medium">{workData.category}</span>.
                Contact our team to learn more about the technique and workflow behind this project.
              </p>
            </div>
          )}
        </article>

        {/* Bottom CTA */}
        <div className="mt-16 p-8 rounded-2xl bg-gradient-to-r from-purple-950/40 to-pink-950/40 border border-purple-800/30 text-center space-y-4 shadow-2xl backdrop-blur-md">
          <h3 className="text-xl font-bold text-white font-heading">Have a similar project in mind?</h3>
          <p className="text-sm text-zinc-300 max-w-lg mx-auto">
            Let's collaborate to bring your creative vision to life with cinematic quality.
          </p>
          <Link
            href="/#contact"
            className="inline-block px-8 py-3 rounded-full font-semibold text-white bg-gradient-to-r from-purple-600 via-purple-700 to-pink-600 hover:from-purple-500 hover:to-pink-500 transition-all text-sm shadow-xl shadow-purple-900/40 hover:scale-105"
          >
            Start a Conversation
          </Link>
        </div>
      </div>
    </main>
  );
}
