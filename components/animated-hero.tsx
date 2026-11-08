"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Film, ArrowDown, Radio } from "lucide-react";

export default function AnimatedHero() {
  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-zinc-950 text-white px-4 md:px-8 border-b border-zinc-800/80">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover -z-10 opacity-35"
      >
        <source src="/montage.mp4" type="video/mp4" />
      </video>

      {/* Dark Vignette Overlays for Maximum Contrast & Readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/80 via-zinc-950/50 to-zinc-950 -z-10" />
      <div className="absolute inset-0 bg-radial-vignette opacity-70 -z-10" />

      {/* Hero Content */}
      <div className="relative z-10 max-w-6xl mx-auto text-center flex flex-col items-center pt-32 pb-20">
        {/* Eyebrow badge with brutalist sharp geometry */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="inline-flex items-center gap-2.5 px-3.5 py-1.5 bg-zinc-900/90 border border-zinc-800 text-xs font-mono uppercase tracking-widest text-zinc-300 mb-8 rounded-none backdrop-blur-md"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span>Motion Design & Broadcast Direction</span>
        </motion.div>

        {/* Massive Clash Display Typography */}
        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-tight text-white mb-6 uppercase leading-[0.92] select-none"
        >
          VISUAL POWER. <br />
          <span className="text-zinc-400">UNMATCHED MOTION.</span>
        </motion.h1>

        {/* High-Contrast Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          className="text-base sm:text-lg md:text-xl text-zinc-300 max-w-2xl mb-12 leading-relaxed font-normal"
        >
          We engineer cinematic motion graphics, 2D/3D character animation, and high-impact live broadcasts for visionary brands and creators.
        </motion.p>

        {/* Brutalist Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
          className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
        >
          <Link
            href="/portfolio"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 font-semibold text-xs uppercase tracking-widest text-black bg-white hover:bg-zinc-200 transition-colors rounded-none border border-white"
          >
            <span>View Works</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/live"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 font-semibold text-xs uppercase tracking-widest text-zinc-200 hover:text-white bg-zinc-900/90 hover:bg-zinc-800 transition-colors rounded-none border border-zinc-800"
          >
            <Radio className="h-4 w-4 text-red-500 animate-pulse" />
            <span>Live Broadcast</span>
          </Link>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-zinc-500 hover:text-zinc-300 transition-colors cursor-pointer"
        onClick={() => {
          const el = document.getElementById("services");
          el?.scrollIntoView({ behavior: "smooth" });
        }}
      >
        <span className="text-[10px] font-mono uppercase tracking-widest">Scroll</span>
        <motion.div
          animate={{ y: [0, 4, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
        >
          <ArrowDown className="h-3.5 w-3.5" />
        </motion.div>
      </motion.div>
    </section>
  );
}
