"use client";

import Image from "next/image";
import { Play } from "lucide-react";

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
    <div className="bg-zinc-950 border border-zinc-800 rounded-none overflow-hidden transition-colors hover:border-zinc-700 flex flex-col justify-between">
      <div>
        <div className="relative aspect-video overflow-hidden bg-black border-b border-zinc-800">
          <Image
            src={work.thumbnail || "/placeholder.jpg"}
            alt={work.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
          {work.featured && (
            <span className="absolute top-2 left-2 text-[10px] font-mono uppercase tracking-wider bg-white text-black px-2 py-0.5 font-semibold">
              Featured
            </span>
          )}
          {work.type === "video" && (
            <div className="absolute top-2 right-2 p-1 bg-black/80 border border-zinc-700 text-white">
              <Play className="w-3 h-3 fill-current" />
            </div>
          )}
        </div>

        <div className="p-4 space-y-2">
          <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 block">
            {work.category}
          </span>
          <h3 className="font-bold text-sm uppercase tracking-tight text-white line-clamp-1 font-heading">
            {work.title}
          </h3>
        </div>
      </div>

      <div className="p-4 pt-0 flex gap-2">
        <button
          onClick={onEdit}
          className="flex-1 py-1.5 px-3 bg-zinc-900 hover:bg-zinc-800 text-zinc-200 text-xs font-mono uppercase tracking-wider border border-zinc-800 transition-colors rounded-none"
        >
          Edit
        </button>
        <button
          onClick={onDelete}
          className="py-1.5 px-3 bg-red-950/30 hover:bg-red-950/60 text-red-400 text-xs font-mono uppercase tracking-wider border border-red-900/40 transition-colors rounded-none"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
