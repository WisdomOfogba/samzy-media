"use client"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Play, X } from "lucide-react"

interface Video {
  id: number
  title: string
  thumbnail: string
  date: string
  duration: string
}

export default function VideoGrid() {
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null)

  const videos: Video[] = [
    {
      id: 1,
      title: "Annual Tech Conference Live Stream",
      thumbnail: "/placeholder.jpg?height=720&width=1280",
      date: "May 15, 2023",
      duration: "2:45:30",
    },
    {
      id: 2,
      title: "Product Launch Event",
      thumbnail: "/placeholder.jpg?height=720&width=1280",
      date: "June 22, 2023",
      duration: "1:15:45",
    },
    {
      id: 3,
      title: "Industry Panel Discussion",
      thumbnail: "/placeholder.jpg?height=720&width=1280",
      date: "July 10, 2023",
      duration: "1:30:20",
    },
    {
      id: 4,
      title: "Creative Workshop Series",
      thumbnail: "/placeholder.jpg?height=720&width=1280",
      date: "August 5, 2023",
      duration: "3:10:15",
    },
    {
      id: 5,
      title: "Annual Awards Ceremony",
      thumbnail: "/placeholder.jpg?height=720&width=1280",
      date: "September 18, 2023",
      duration: "2:25:00",
    },
    {
      id: 6,
      title: "Virtual Conference Production",
      thumbnail: "/placeholder.jpg?height=720&width=1280",
      date: "October 7, 2023",
      duration: "4:05:30",
    },
  ]

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
    <>
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {videos.map((video) => (
          <motion.div
            key={video.id}
            className="group relative overflow-hidden rounded-lg aspect-video cursor-pointer"
            variants={item}
            whileHover={{ y: -5 }}
            transition={{ duration: 0.3 }}
            onClick={() => setSelectedVideo(video)}
          >
            <Image
              src={video.thumbnail || "/placeholder.jpg"}
              alt={video.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="h-16 w-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:bg-purple-600 transition-colors">
                  <Play className="h-8 w-8 text-white" />
                </div>
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-300">{video.date}</span>
                  <span className="text-sm bg-black/50 px-2 py-1 rounded text-white">{video.duration}</span>
                </div>
                <h3 className="text-lg font-bold text-white">{video.title}</h3>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {selectedVideo && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <div className="relative w-full max-w-5xl aspect-video bg-black rounded-lg overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-white text-xl">Video Player: {selectedVideo.title}</div>
            </div>

            <button
              className="absolute top-4 right-4 h-10 w-10 rounded-full bg-black/50 flex items-center justify-center hover:bg-black/70 transition-colors z-10"
              onClick={() => setSelectedVideo(null)}
            >
              <X className="h-6 w-6 text-white" />
            </button>
          </div>
        </div>
      )}
    </>
  )
}
