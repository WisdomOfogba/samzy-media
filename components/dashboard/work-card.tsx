"use client";

import Image from "next/image";
import { Play, Sparkles } from "lucide-react";

interface WorkCardProps {
  work: {
    _id: string;
    title: string;
    thumbnail: string;
    category: string;
    type: "image" | "video";
    featured: boolean;
  };
  onEdit: () => void;
  onDelete: () => void;
}

export function WorkCard({ work, onEdit, onDelete }: WorkCardProps) {
  return (
    <div className="bg-zinc-900/60 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden transition-all duration-300 hover:border-purple-500/40 hover:shadow-xl hover:shadow-purple-950/25 flex flex-col justify-between">
      <div>
        <div className="relative aspect-video overflow-hidden bg-black border-b border-white/10">
          <Image
            src={work.thumbnail || "/placeholder.jpg"}
            alt={work.title}
            fill
            className="object-cover transition-transform duration-500 hover:scale-105"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
          {work.featured && (
            <span className="absolute top-3 left-3 text-[11px] font-semibold uppercase tracking-wider bg-amber-950/80 text-amber-300 border border-amber-800/40 px-2.5 py-1 rounded-full backdrop-blur-md flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              Featured
            </span>
          )}
          {work.type === "video" && (
            <div className="absolute top-3 right-3 p-1.5 bg-black/70 border border-white/10 rounded-full text-white backdrop-blur-md">
              <Play className="w-3.5 h-3.5 fill-current" />
            </div>
          )}
        </div>

        <div className="p-5 space-y-2">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-purple-400 block">
            {work.category}
          </span>
          <h3 className="font-bold text-base tracking-tight text-white line-clamp-1 font-heading">
            {work.title}
          </h3>
        </div>
      </div>

      <div className="p-5 pt-0 flex gap-2.5">
        <button
          onClick={onEdit}
          className="flex-1 py-2 px-3 bg-white/5 hover:bg-white/10 text-zinc-200 hover:text-white text-xs font-semibold uppercase tracking-wider border border-white/10 transition-colors rounded-xl"
        >
          Edit
        </button>
        <button
          onClick={onDelete}
          className="py-2 px-3 bg-red-950/30 hover:bg-red-950/60 text-red-300 text-xs font-semibold uppercase tracking-wider border border-red-800/40 transition-colors rounded-xl"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
