"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Film, ArrowDown } from "lucide-react";

export default function AnimatedHero() {
  return (
    <section className="relative overflow-hidden w-full min-h-screen flex items-center justify-center bg-black text-white px-4 md:px-8">
      {/* Background Video (First Child) */}
      <video
        src="/montage.mp4"
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0 opacity-30 pointer-events-none"
      />

      {/* Atmospheric Overlays & Ambient Glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black z-0 pointer-events-none" />
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-purple-700/25 rounded-full blur-3xl pointer-events-none z-0" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-pink-600/20 rounded-full blur-3xl pointer-events-none z-0" />

      {/* Content Container (z-10 sits on top of video) */}
      <div className="relative z-10 max-w-5xl mx-auto text-center flex flex-col items-center pt-32 pb-20">
        {/* Eyebrow badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs md:text-sm font-medium text-zinc-300 mb-8 backdrop-blur-md shadow-lg shadow-purple-950/20"
        >
          <Sparkles className="h-3.5 w-3.5 text-purple-400" />
          <span>Cinematic Media Production & Motion Design</span>
        </motion.div>

        {/* Main Heading with Clash Display & Gradient Text Clipping */}
        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
          className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white mb-6 leading-[1.08] font-heading"
        >
          Visual Storytelling &{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400">
            Motion Design
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
          className="text-lg md:text-2xl text-zinc-300 max-w-2xl mb-10 leading-relaxed font-normal"
        >
          We craft captivating visual worlds, character animations, dynamic brand identities, and live streaming productions that leave lasting impressions.
        </motion.p>

        {/* CTA Buttons with Rounded-Full & Purple Gradients */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.45, ease: "easeOut" }}
          className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
        >
          <Link
            href="/portfolio"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-semibold text-white bg-gradient-to-r from-purple-600 via-purple-700 to-pink-600 hover:from-purple-500 hover:to-pink-500 shadow-xl shadow-purple-900/40 hover:scale-105 transition-all"
          >
            <span>View Portfolio</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/live"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-semibold text-zinc-200 hover:text-white bg-white/10 hover:bg-white/20 border border-white/10 backdrop-blur-md shadow-lg hover:scale-105 transition-all"
          >
            <Film className="h-4 w-4 text-purple-400" />
            <span>Live Broadcasts</span>
          </Link>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-zinc-500 hover:text-zinc-300 transition-colors cursor-pointer z-10"
        onClick={() => {
          const el = document.getElementById("services");
          el?.scrollIntoView({ behavior: "smooth" });
        }}
      >
        <span className="text-[11px] uppercase tracking-widest font-medium">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
        >
          <ArrowDown className="h-4 w-4" />
        </motion.div>
      </motion.div>
    </section>
  );
}
