"use client";

import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import PortfolioGrid from "@/components/portfolio-grid";
import PortfolioFilter from "@/components/portfolio-filter";

export default function PortfolioPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  return (
    <main className="min-h-screen pt-28 pb-24 px-4 md:px-8 lg:px-12 bg-zinc-950 text-white">
      <div className="container mx-auto max-w-6xl">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-zinc-400 hover:text-white mb-8 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Link>

        <div className="mb-10">
          <div className="text-xs font-mono uppercase tracking-widest text-zinc-400 mb-2">
            <span>[ Production Catalog ]</span>
          </div>
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight uppercase">
            All Works
          </h1>
          <p className="text-base sm:text-lg text-zinc-400 max-w-2xl mt-4 leading-relaxed font-normal">
            Motion design systems, 2D/3D character animation, dynamic brand packages, and high-impact live productions.
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
