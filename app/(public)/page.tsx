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
    "Specializing in motion graphics, 2D/3D animations, logo animations, media production, and live broadcast engineering.",
};

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-zinc-950 text-zinc-100">
      {/* Looping Montage Video Hero */}
      <AnimatedHero />

      {/* Narrative Section */}
      <section className="w-full py-24 px-4 md:px-8 lg:px-12 bg-zinc-950 border-b border-zinc-800/80 text-white">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-zinc-400 mb-4">
              <span>[ Philosophy ]</span>
            </div>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6 uppercase">
              Every frame is engineered with intention.
            </h2>
            <p className="text-base sm:text-lg text-zinc-400 leading-relaxed mb-8">
              From broadcast packaging and stadium visual displays to high-impact brand identities and live multi-camera feeds, we merge technical rigor with artistic direction.
            </p>
            <Link
              href="/portfolio"
              className="inline-flex items-center gap-2 text-sm font-mono uppercase tracking-wider text-white hover:text-zinc-300 transition-colors group"
            >
              <span>Explore Works</span>
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1.5 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <ServicesSection />

      {/* Featured Works Section */}
      <section className="w-full py-24 px-4 md:px-8 lg:px-12 bg-zinc-950 text-white border-b border-zinc-800/80">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
            <div>
              <div className="text-xs font-mono uppercase tracking-widest text-zinc-400 mb-2">
                <span>[ Selected Work ]</span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight uppercase">
                Featured Projects
              </h2>
            </div>
            <Link
              href="/portfolio"
              className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-mono uppercase tracking-wider bg-zinc-900 hover:bg-zinc-800 text-zinc-200 hover:text-white transition-all border border-zinc-800 rounded-none"
            >
              <span>View All Projects</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <PortfolioGrid featured={true} limit={6} />
        </div>
      </section>

      {/* Contact Section */}
      <ContactSection />
    </main>
  );
}
