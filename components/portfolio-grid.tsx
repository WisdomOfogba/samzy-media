"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Play, ExternalLink } from "lucide-react"

interface PortfolioItem {
  id: number
  title: string
  category: string
  thumbnail: string
  featured: boolean
}

interface PortfolioGridProps {
  featured?: boolean
  limit?: number
  selectedCategory?: string | null
}

export default function PortfolioGrid({ featured = false, limit, selectedCategory }: PortfolioGridProps) {
  const [items, setItems] = useState<PortfolioItem[]>([])

  useEffect(() => {
const portfolioItems: PortfolioItem[] = [
      {
        id: 1,
        title: "Dynamic Logo Animation",
        category: "logo-animation",
        thumbnail: "/placeholder.jpg?height=600&width=800",
        featured: true,
      },
      {
        id: 2,
        title: "Product Showcase",
        category: "motion-graphics",
        thumbnail: "/placeholder.jpg?height=600&width=800",
        featured: true,
      },
      {
        id: 3,
        title: "Corporate Explainer",
        category: "animation",
        thumbnail: "/placeholder.jpg?height=600&width=800",
        featured: true,
      },
      {
        id: 4,
        title: "Music Visualizer",
        category: "motion-graphics",
        thumbnail: "/placeholder.jpg?height=600&width=800",
        featured: true,
      },
      {
        id: 5,
        title: "Character Animation",
        category: "animation",
        thumbnail: "/placeholder.jpg?height=600&width=800",
        featured: false,
      },
      {
        id: 6,
        title: "UI Motion Design",
        category: "motion-graphics",
        thumbnail: "/placeholder.jpg?height=600&width=800",
        featured: true,
      },
      {
        id: 7,
        title: "3D Product Animation",
        category: "animation",
        thumbnail: "/placeholder.jpg?height=600&width=800",
        featured: false,
      },
      {
        id: 8,
        title: "Brand Identity Animation",
        category: "logo-animation",
        thumbnail: "/placeholder.jpg?height=600&width=800",
        featured: true,
      },
      {
        id: 9,
        title: "Social Media Animation",
        category: "motion-graphics",
        thumbnail: "/placeholder.jpg?height=600&width=800",
        featured: false,
      },
      {
        id: 10,
        title: "Title Sequence",
        category: "media-production",
        thumbnail: "/placeholder.jpg?height=600&width=800",
        featured: false,
      },
      {
        id: 11,
        title: "Event Intro",
        category: "media-production",
        thumbnail: "/placeholder.jpg?height=600&width=800",
        featured: false,
      },
      {
        id: 12,
        title: "App Promo",
        category: "motion-graphics",
        thumbnail: "/placeholder.jpg?height=600&width=800",
        featured: false,
      },
    ]

    let filteredItems = portfolioItems

    if (featured) {
      filteredItems = filteredItems.filter((item) => item.featured)
    }

    if (selectedCategory) {
      filteredItems = filteredItems.filter((item) => item.category === selectedCategory)
    }

    if (limit) {
      filteredItems = filteredItems.slice(0, limit)
    }

    setItems(filteredItems)
  }, [featured, limit, selectedCategory])

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      variants={container}
      initial="hidden"
      animate="show"
    >
      {items.map((portfolioItem) => (
        <motion.div
          key={portfolioItem.id}
          className="group relative overflow-hidden rounded-lg aspect-video cursor-pointer"
          variants={item}
          whileHover={{ y: -5 }}
          transition={{ duration: 0.3 }}
        >
          <Image
            src={portfolioItem.thumbnail || "/placeholder.jpg"}
            alt={portfolioItem.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="absolute inset-0 flex flex-col justify-end p-6">
              <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                <div className="text-xs font-medium text-purple-400 uppercase tracking-wider mb-2">
                  {portfolioItem.category.split("-").join(" ")}
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{portfolioItem.title}</h3>

                <div className="flex items-center gap-3 mt-4">
                  <button className="h-10 w-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-colors">
                    <Play className="h-5 w-5 text-white" />
                  </button>
                  <button className="h-10 w-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-colors">
                    <ExternalLink className="h-5 w-5 text-white" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  )
}
