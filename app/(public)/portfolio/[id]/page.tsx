import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, Tag } from "lucide-react";
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
    <main className="min-h-screen pt-28 pb-24 px-4 md:px-8 lg:px-12 bg-zinc-950 text-white">
      <div className="container mx-auto max-w-4xl">
        {/* Navigation Breadcrumb */}
        <Link
          href="/portfolio"
          className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-zinc-400 hover:text-white mb-8 transition-colors"
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
            <div className="relative w-full aspect-video rounded-sm overflow-hidden bg-black border border-zinc-800">
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
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-zinc-800 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-mono uppercase tracking-wider bg-zinc-900 text-zinc-300 border border-zinc-800 rounded-none">
                <Tag className="h-3 w-3" />
                {workData.category}
              </span>
              {workData.featured && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-mono uppercase tracking-wider bg-zinc-800 text-white border border-zinc-700 rounded-none">
                  Featured
                </span>
              )}
            </div>
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-white uppercase">
              {workData.title}
            </h1>
          </div>

          {workData.createdAt && (
            <div className="flex items-center gap-1.5 text-xs font-mono text-zinc-500">
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
          <h2 className="text-xl md:text-2xl font-bold text-white uppercase tracking-tight font-heading">
            Case Study & Creative Context
          </h2>

          {workData.story ? (
            <div className="whitespace-pre-line bg-zinc-900/60 p-6 md:p-8 rounded-sm border border-zinc-800 text-zinc-300 font-sans text-base leading-relaxed">
              {workData.story}
            </div>
          ) : (
            <div className="p-8 rounded-sm border border-zinc-800 bg-zinc-900/40 text-center text-zinc-400 font-mono text-xs uppercase tracking-wider">
              <p>
                Production details for this project can be discussed directly with our creative team.
              </p>
            </div>
          )}
        </article>

        {/* Bottom CTA */}
        <div className="mt-16 p-8 rounded-sm bg-zinc-900 border border-zinc-800 text-center space-y-4">
          <h3 className="text-xl font-bold text-white uppercase tracking-tight">Have a similar project in mind?</h3>
          <p className="text-sm text-zinc-400 max-w-lg mx-auto">
            Let's collaborate to bring your creative vision to life with cinematic quality.
          </p>
          <Link
            href="/#contact"
            className="inline-block px-6 py-3 font-mono text-xs uppercase tracking-widest text-black bg-white hover:bg-zinc-200 transition-colors rounded-none border border-white font-semibold"
          >
            Start a Conversation
          </Link>
        </div>
      </div>
    </main>
  );
}
