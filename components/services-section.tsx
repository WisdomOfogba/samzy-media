"use client";

import { motion } from "framer-motion";
import { Film, Layers, Play, ImagesIcon, Sparkles } from "lucide-react";
import Image from "next/image";
import { ServicesSkeleton } from "./Loader";
import { useProjects } from "@/context/ProjectsContext";

export default function ServicesSection() {
  const { projects: mediaItems, loading } = useProjects();

  if (loading) {
    return <ServicesSkeleton />;
  }

  const services = [
    {
      icon: <Layers className="h-6 w-6 text-purple-400" />,
      title: "Motion Graphics",
      image: mediaItems.find((item) => item.category === "Motion Graphics"),
      description: "High-impact visual packages, broadcast intros, and typographic animations engineered for maximum engagement.",
    },
    {
      icon: <Film className="h-6 w-6 text-pink-400" />,
      title: "2D/3D Animation",
      image: mediaItems.find((item) => item.category === "Animations"),
      description: "Character rigging, dynamic spatial animations, and immersive conceptual worlds built for screen and stage.",
    },
    {
      icon: <Play className="h-6 w-6 text-purple-400" />,
      title: "Logo Montages",
      image: mediaItems.find((item) => item.category === "Logo Montage"),
      description: "Signature cinematic logo stings and identity reveals designed to define your brand authority in milliseconds.",
    },
    {
      icon: <ImagesIcon className="h-6 w-6 text-pink-400" />,
      title: "Broadcast Media",
      image: mediaItems.find((item) => item.category === "Birthday Designs"),
      description: "Live multi-camera graphics, lower thirds, overlay packages, and stadium visual loops.",
    },
    {
      icon: <ImagesIcon className="h-6 w-6 text-purple-400" />,
      title: "Graphic Design Systems",
      image: mediaItems.find((item) => item.category === "Graphics Design"),
      description: "Comprehensive visual branding, digital posters, campaign artwork, and high-resolution event media.",
    },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <section
      id="services"
      className="w-full py-24 px-4 md:px-8 lg:px-12 bg-gradient-to-b from-black via-zinc-950 to-black text-white relative overflow-hidden"
    >
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-purple-900/10 rounded-full blur-3xl pointer-events-none" />

      <div className="mx-auto max-w-6xl relative z-10">
        <div className="mb-16 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-purple-400 mb-3 px-3 py-1 rounded-full bg-purple-950/40 border border-purple-800/30">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Our Disciplines</span>
          </div>
          <motion.h2
            className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight font-heading"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Creative Capabilities
          </motion.h2>
          <motion.p
            className="text-base sm:text-lg text-zinc-300 mt-4 leading-relaxed font-normal"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Our studio executes specialized motion direction, 3D world creation, and broadcast visual engineering.
          </motion.p>
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="relative h-72 rounded-2xl overflow-hidden border border-white/10 bg-zinc-900/60 backdrop-blur-md group hover:border-purple-500/40 hover:shadow-2xl hover:shadow-purple-950/30 transition-all duration-300"
              variants={item}
            >
              <Image
                src={service.image?.thumbnail || "/placeholder.jpg"}
                alt={service.image?.title || service.title}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover transition-transform duration-700 group-hover:scale-110 opacity-30 group-hover:opacity-20"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" />
              <div className="absolute inset-0 p-6 flex flex-col justify-end">
                <div className="mb-3 p-3 bg-white/5 border border-white/10 self-start rounded-xl backdrop-blur-md">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold tracking-tight text-white mb-2 font-heading">
                  {service.title}
                </h3>
                <p className="text-zinc-300 text-sm leading-relaxed font-sans">
                  {service.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
