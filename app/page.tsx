import Link from "next/link"
import { ArrowRight, Play } from "lucide-react"
import AnimatedHero from "@/components/animated-hero"
import WaterDivider from "@/components/water-divider"
import PortfolioGrid from "@/components/portfolio-grid"
import ServicesSection from "@/components/services-section"
import ContactSection from "@/components/contact-section"
import CinematicLogo from "@/components/cinematic-logo"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <CinematicLogo />
      <AnimatedHero />

      <section className="w-full py-20 px-4 md:px-8 lg:px-12 bg-black text-white">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">
            We bring{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#da373c] to-[#fea85b]">ideas</span> to
            life
          </h2>
          <p className="text-lg md:text-xl max-w-2xl mb-10 text-gray-300">
            Specializing in motion graphics, animations, logo animations, media production, and sound management.
          </p>
          <Link
            href="/portfolio"
            className="group inline-flex items-center gap-2 text-lg font-medium text-white hover:text-[#da373c] transition-colors"
          >
            Explore our work
            <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>

      <ServicesSection />

      <section className="w-full py-20 px-4 md:px-8 lg:px-12 bg-black text-white">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">Featured Work</h2>
              <p className="text-lg max-w-xl text-gray-300">
                A selection of our best motion graphics and animation projects
              </p>
            </div>
            <Link
              href="/portfolio"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-black font-medium hover:bg-[##5c0987] hover:text-white transition-colors"
            >
              View all projects
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>

          <PortfolioGrid featured={true} limit={6} />
        </div>
      </section>

      {/* <section className="w-full py-20 px-4 md:px-8 lg:px-12 bg-gradient-to-br from-[#fea85b] to-[#da373c] text-white">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="md:w-1/2">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">Live Streaming Production</h2>
              <p className="text-lg mb-8 text-gray-300">
                Professional live streaming services with high-quality production value. We handle everything from setup
                to execution.
              </p>
              <Link
                href="/live-streaming"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-black font-medium hover:bg-[#da373c] hover:text-white transition-colors"
              >
                Watch our streams
                <Play className="h-5 w-5" />
              </Link>
            </div>
            <div className="md:w-1/2 relative aspect-video rounded-lg overflow-hidden shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10"></div>
              <div className="absolute inset-0 bg-[url('/placeholder.jpg?height=720&width=1280')] bg-cover bg-center"></div>
              <div className="absolute inset-0 flex items-center justify-center z-20">
                <div className="h-20 w-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center cursor-pointer hover:bg-white/30 transition-colors">
                  <Play className="h-8 w-8 text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> */}

      <ContactSection />
    </main>
  )
}
