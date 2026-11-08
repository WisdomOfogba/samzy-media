"use client";

import Link from "next/link";
import { ArrowLeft, Sparkles } from "lucide-react";
import { WorkForm } from "@/components/dashboard/work-form";

export default function NewWorkPage() {
  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-950/60 border border-purple-800/40 text-xs font-medium text-purple-300 mb-2">
            <Sparkles className="w-3 h-3" />
            <span>Creative Publishing</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-bold tracking-tight text-white font-heading">
            Create New Work
          </h1>
          <p className="text-sm text-zinc-400 mt-1">
            Add a new video montage, motion graphics system, or creative case study to your portfolio.
          </p>
        </div>

        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-white bg-white/10 hover:bg-white/20 border border-white/10 transition-all rounded-full self-start sm:self-auto backdrop-blur-md shadow-md"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Works</span>
        </Link>
      </div>

      <WorkForm />
    </div>
  );
}
