"use client";

import { motion } from "framer-motion";
import { Film, Layers, Play, ImagesIcon } from "lucide-react";
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
      icon: <Layers className="h-6 w-6" />,
      title: "Motion Graphics",
      image: mediaItems.find((item) => item.category === "Motion Graphics"),
      description: "High-impact visual packages, broadcast intros, and typographic animations engineered for maximum engagement.",
    },
    {
      icon: <Film className="h-6 w-6" />,
      title: "2D/3D Animation",
      image: mediaItems.find((item) => item.category === "Animations"),
      description: "Character rigging, dynamic spatial animations, and immersive conceptual worlds built for screen and stage.",
    },
    {
      icon: <Play className="h-6 w-6" />,
      title: "Logo Montages",
      image: mediaItems.find((item) => item.category === "Logo Montage"),
      description: "Signature cinematic logo stings and identity reveals designed to define your brand authority in milliseconds.",
    },
    {
      icon: <ImagesIcon className="h-6 w-6" />,
      title: "Broadcast Media",
      image: mediaItems.find((item) => item.category === "Birthday Designs"),
      description: "Live multi-camera graphics, lower thirds, overlay packages, and stadium visual loops.",
    },
    {
      icon: <ImagesIcon className="h-6 w-6" />,
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
      className="w-full py-24 px-4 md:px-8 lg:px-12 bg-zinc-950 text-white border-b border-zinc-800/80"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mb-14">
          <div className="text-xs font-mono uppercase tracking-widest text-zinc-400 mb-2">
            <span>[ Capabilities ]</span>
          </div>
          <motion.h2
            className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight uppercase"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Creative Disciplines
          </motion.h2>
          <motion.p
            className="text-base sm:text-lg text-zinc-400 max-w-2xl mt-4 leading-relaxed font-normal"
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
              className="relative h-72 rounded-none overflow-hidden border border-zinc-800 bg-zinc-900 group"
              variants={item}
            >
              <Image
                src={service.image?.thumbnail || "/placeholder.jpg"}
                alt={service.image?.title || service.title}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105 opacity-40 group-hover:opacity-30"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/70 to-transparent" />
              <div className="absolute inset-0 p-6 flex flex-col justify-end">
                <div className="text-white mb-3 p-2 bg-zinc-900/90 border border-zinc-800 self-start rounded-none">
                  {service.icon}
                </div>
                <h3 className="text-lg font-bold uppercase tracking-tight text-white mb-2 font-heading">
                  {service.title}
                </h3>
                <p className="text-zinc-400 text-xs leading-relaxed font-sans">
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
