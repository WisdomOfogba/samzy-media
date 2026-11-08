"use client";

import { useState } from "react";
import { ArrowLeft, Sparkles } from "lucide-react";
import Link from "next/link";
import PortfolioGrid from "@/components/portfolio-grid";
import PortfolioFilter from "@/components/portfolio-filter";

export default function PortfolioPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

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

        <div className="mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-purple-400 mb-3 px-3 py-1 rounded-full bg-purple-950/40 border border-purple-800/30">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Creative Showcase</span>
          </div>
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight font-heading">
            Our Portfolio
          </h1>
          <p className="text-base sm:text-lg text-zinc-300 max-w-2xl mt-4 leading-relaxed font-normal">
            Explore our curated catalog across motion graphics, 2D/3D character animations, cinema logo stings, and live media productions.
          </p>
        </div>

        <PortfolioFilter
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />

        <PortfolioGrid selectedCategory={selectedCategory} />
      </div>
    </main>
  );
}
