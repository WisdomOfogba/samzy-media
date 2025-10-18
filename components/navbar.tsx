"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import Image from "next/image";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 py-4 px-4 transition-all duration-300 ${
          isScrolled
            ? "bg-black/80 backdrop-blur-md"
            : "bg-transparent"
        }`}
      >
        <motion.div
          className="max-w-6xl mx-auto flex items-center justify-between"
          initial={{ opacity: 0, y: "-100%" }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: "-100%" }}
          transition={{ duration: 0.3 }}
        >
          <Link href="/" className="text-white font-bold text-2xl">
            <Image
              src="/logo-icon.png"
              alt="Samzy media production logo"
              width={200}
              height={150}
              className="w-16"
            />
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="/"
              className="text-white hover:text-purple-400 transition-colors"
            >
              Home
            </Link>
            <Link
              href="/portfolio"
              className="text-white hover:text-purple-400 transition-colors"
            >
              Portfolio
            </Link>
            {/* <Link
              href="/live-streaming"
              className="text-white hover:text-purple-400 transition-colors"
            >
              Live Streaming
            </Link> */}
            <Link
              href="/#services"
              className="text-white hover:text-purple-400 transition-colors"
            >
              Services
            </Link>
            <Link
              href="/#contact"
              className="px-6 py-2 rounded-full bg-gradient-to-r  from-[#5c0987] to-[#c228e3] hover:from-[#c228e3] hover:to-[#5c0987]  text-white font-mediumtransition-colors"
            >
              Contact Us
            </Link>
          </nav>

          <button
            className="md:hidden text-white"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu className="h-6 w-6" />
          </button>
        </motion.div>
      </header>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="fixed inset-0 bg-black z-50 flex flex-col"
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex justify-between items-center p-4 border-b border-white/10">
              <Link
                href="/"
                className="text-white font-bold text-2xl"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Image
                  src="/logo-icon.png"
                  alt="Samzy media production logo"
                  width={200}
                  height={150}
                  className="w-16"
                />
              </Link>
              <button
                className="text-white"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <nav className="flex flex-col p-6 gap-6">
              <Link
                href="/"
                className="text-white text-2xl font-medium hover:text-purple-400 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/portfolio"
                className="text-white text-2xl font-medium hover:text-purple-400 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Portfolio
              </Link>
              {/* <Link
                href="/live-streaming"
                className="text-white text-2xl font-medium hover:text-purple-400 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Live Streaming
              </Link> */}
              <Link
                href="/#services"
                className="text-white text-2xl font-medium hover:text-purple-400 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Services
              </Link>
              <Link
                href="/#contact"
                className="px-6 py-3 rounded-full bg-gradient-to-r from-[#5c0987] to-[#c228e3] hover:from-[#c228e3] hover:to-[#5c0987] text-white font-medium transition-colors text-center"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contact Us
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
