import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import AnimatedHero from "@/components/animated-hero";
import PortfolioGrid from "@/components/portfolio-grid";
import ServicesSection from "@/components/services-section";
import ContactSection from "@/components/contact-section";

export const metadata: Metadata = {
  title: "Samzy Media | Motion Design & Visual Storytelling Studio",
  description:
    "Specializing in motion graphics, 2D/3D animations, logo animations, media production, and sound management.",
};

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-black text-white selection:bg-purple-600 selection:text-white">
      {/* Cinematic Dark-Mode Hero with Montage Background Video */}
      <AnimatedHero />

      {/* Narrative Transition Section */}
      <section className="w-full py-24 px-4 md:px-8 lg:px-12 bg-zinc-950/80 border-y border-white/5 text-white relative overflow-hidden">
        <div className="absolute top-1/2 right-0 w-80 h-80 bg-purple-900/10 rounded-full blur-3xl pointer-events-none" />
        <div className="mx-auto max-w-6xl relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-purple-400 mb-3 px-3 py-1 rounded-full bg-purple-950/40 border border-purple-800/30">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Our Philosophy</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 font-heading">
              We bring{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-amber-300">
                ideas to life
              </span>{" "}
              through motion
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-zinc-300 leading-relaxed mb-8 font-normal">
              Every frame is engineered with intention. From high-energy broadcast packaging to subtle typographic micro-animations, we combine cutting-edge technology with artful storytelling.
            </p>
            <Link
              href="/portfolio"
              className="inline-flex items-center gap-2 text-base font-semibold text-purple-400 hover:text-purple-300 transition-colors group"
            >
              <span>Explore our work</span>
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1.5 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <ServicesSection />

      {/* Featured Works Section */}
      <section className="w-full py-24 px-4 md:px-8 lg:px-12 bg-black text-white relative">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-14">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-purple-400 mb-2 px-3 py-1 rounded-full bg-purple-950/40 border border-purple-800/30">
                <span>Selected Works</span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight font-heading">
                Featured Projects
              </h2>
              <p className="text-base sm:text-lg text-zinc-400 mt-2 max-w-xl">
                A curated showcase of our most recent motion design, 3D animations, and broadcast productions.
              </p>
            </div>
            <Link
              href="/portfolio"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/10 hover:bg-white text-white hover:text-black font-semibold text-sm transition-all border border-white/15 backdrop-blur-md shadow-lg"
            >
              <span>View All Projects</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <PortfolioGrid featured={true} limit={6} />
        </div>
      </section>

      {/* Client Inquiry / Contact Section */}
      <ContactSection />
    </main>
  );
}
