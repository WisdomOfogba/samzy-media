"use client"

import { motion } from "framer-motion"
import { Film, Layers, Play, Music, Tv, ImagesIcon } from "lucide-react"
import { MediaItem, mediaItems } from "@/lib/data"
import Image from "next/image"

export default function ServicesSection() {
  const services = [
    {
      icon: <Layers className="h-10 w-10" />,
      title: "Motion Graphics",
      image: mediaItems.find(item => item.category === "Motion Graphics"),
      description: "Eye-catching motion graphics for brands, products, and digital content.",
    },
    {
      icon: <Film className="h-10 w-10" />,
      title: "Animations",
      image: mediaItems.find(item => item.category === "Animations"),
      description: "Custom animations that bring your ideas and stories to life with character and style.",
    },
    {
      icon: <Play className="h-10 w-10" />,
      title: "Logo Animations",
      image: mediaItems.find(item => item.category === "Logo Montage"),
      description: "Dynamic logo animations that enhance brand recognition and engagement.",
    },
    {
      icon: <ImagesIcon className="h-10 w-10" />,
      title: "Birthday Designs",
      image: mediaItems.find(item => item.category === "Birthday Designs"),
      description: "Personalized birthday designs and visual content to celebrate special moments.",
    },
    {
      icon: <ImagesIcon className="h-10 w-10" />,
      title: "Graphics Design",
      image: mediaItems.find(item => item.category === "Graphics Design"),
      description: "Professional graphic design services for social media, marketing materials, and branding.",
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
    <section
      id="services"
      className="w-full py-20 px-4 md:px-8 lg:px-12 bg-gradient-to-br from-black to-purple-950 text-white"
    >
      <div className="mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <motion.h2
            className="text-4xl md:text-5xl font-bold mb-6 tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Our Services
          </motion.h2>
          <motion.p
            className="text-lg max-w-2xl mx-auto text-gray-300"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            We offer a comprehensive range of creative services to bring your vision to life
          </motion.p>
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="relative h-60 rounded-xl overflow-hidden border border-white/10 group"
              variants={item}
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <Image
                src={service.image?.thumbnail || "/placeholder.jpg"}
                alt={service.image?.title || "Service Image"}
                width={800}
                height={600}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/60 group-hover:bg-black/50 transition-colors" />
              <div className="absolute inset-0 p-8 flex flex-col justify-end">
                <div className="text-[#fea85b] mb-4">{service.icon}</div>
                <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                <p className="text-gray-300 text-sm">{service.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
