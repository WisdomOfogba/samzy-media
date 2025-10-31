"use client"

import { motion } from "framer-motion"

interface PortfolioFilterProps {
  selectedCategory: string | null
  onSelectCategory: (category: string | null) => void
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
  ]

  return (
    <div className="mb-12">
      <div className="flex flex-wrap gap-3">
        <button
          onClick={() => onSelectCategory(null)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            selectedCategory === null
              ? "bg-purple-600 text-white"
              : "bg-white/10 text-white hover:bg-white/20"
          }`}
        >
          All
        </button>

        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => onSelectCategory(category.id)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              selectedCategory === category.id
                ? "bg-purple-600 text-white"
                : "bg-white/10 text-white hover:bg-white/20"
            }`}
          >
            {category.label}
          </button>
        ))}
      </div>

      <motion.div
        className="h-1 bg-gradient-to-r from-purple-600 to-pink-600 mt-4 rounded-full"
        initial={{ width: 0 }}
        animate={{ width: "100%" }}
        transition={{ duration: 1 }}
      />
    </div>
  )
}
