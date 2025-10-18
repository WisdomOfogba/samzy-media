"use client";

import { motion } from "framer-motion";

export default function CinematicLogo() {
  return (
    <section className="relative h-screen w-full overflow-hidden bg-black text-white">
      {/* Background video */}
      <video
        className="absolute inset-0 h-full w-full object-cover"
        src="/placeholder-video.mp4"
        autoPlay
        loop
        muted
        playsInline
      />
    </section>
  );
}
