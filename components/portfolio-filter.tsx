"use client";

import { motion } from "framer-motion";

interface PortfolioFilterProps {
  selectedCategory: string | null;
  onSelectCategory: (category: string | null) => void;
}

export default function PortfolioFilter({
  selectedCategory,
  onSelectCategory,
}: PortfolioFilterProps) {
  const categories = [
    { id: "Motion Graphics", label: "Motion Graphics" },
    { id: "Animations", label: "Animations" },
    { id: "Logo Montage", label: "Logo Montage" },
    { id: "Graphics Design", label: "Graphics Design" },
    { id: "Birthday Designs", label: "Birthday Designs" },
  ];

  return (
    <div className="mb-12">
      <div className="flex flex-wrap gap-2.5">
        <button
          onClick={() => onSelectCategory(null)}
          className={`px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all ${
            selectedCategory === null
              ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-900/30 scale-105"
              : "bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white border border-white/10"
          }`}
        >
          All Works
        </button>

        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => onSelectCategory(category.id)}
            className={`px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all ${
              selectedCategory === category.id
                ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-900/30 scale-105"
                : "bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white border border-white/10"
            }`}
          >
            {category.label}
          </button>
        ))}
      </div>
    </div>
  );
}
