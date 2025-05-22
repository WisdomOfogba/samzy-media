"use client"

import { motion } from "framer-motion"
import { Film, Layers, Play, Music, Tv } from "lucide-react"

export default function ServicesSection() {
  const services = [
    {
      icon: <Layers className="h-10 w-10" />,
      title: "Motion Graphics",
      description: "Eye-catching motion graphics for brands, products, and digital content.",
    },
    {
      icon: <Film className="h-10 w-10" />,
      title: "Animations",
      description: "Custom animations that bring your ideas and stories to life with character and style.",
    },
    {
      icon: <Play className="h-10 w-10" />,
      title: "Logo Animations",
      description: "Dynamic logo animations that enhance brand recognition and engagement.",
    },
    {
      icon: <Tv className="h-10 w-10" />,
      title: "Media Production",
      description: "Full-service media production for commercials, explainer videos, and promotional content.",
    },
    {
      icon: <Music className="h-10 w-10" />,
      title: "Sound Management",
      description: "Professional sound design, mixing, and audio production for all your projects.",
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
      <div className="container mx-auto max-w-6xl">
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
              className="bg-white/5 backdrop-blur-sm rounded-xl p-8 hover:bg-white/10 transition-colors border border-white/10"
              variants={item}
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <div className="text-purple-400 mb-4">{service.icon}</div>
              <h3 className="text-xl font-bold mb-3">{service.title}</h3>
              <p className="text-gray-300">{service.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
