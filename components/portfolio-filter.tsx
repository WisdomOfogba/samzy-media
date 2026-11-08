"use client";

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
    <div className="mb-10">
      <div className="flex flex-wrap gap-2.5">
        <button
          onClick={() => onSelectCategory(null)}
          className={`px-4 py-2 rounded-none text-xs font-mono uppercase tracking-widest transition-colors border ${
            selectedCategory === null
              ? "bg-white text-black border-white font-semibold"
              : "bg-zinc-900 text-zinc-400 hover:text-white border-zinc-800 hover:border-zinc-700"
          }`}
        >
          [ All Works ]
        </button>

        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => onSelectCategory(category.id)}
            className={`px-4 py-2 rounded-none text-xs font-mono uppercase tracking-widest transition-colors border ${
              selectedCategory === category.id
                ? "bg-white text-black border-white font-semibold"
                : "bg-zinc-900 text-zinc-400 hover:text-white border-zinc-800 hover:border-zinc-700"
            }`}
          >
            {category.label}
          </button>
        ))}
      </div>
    </div>
  );
}
