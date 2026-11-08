"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import Image from "next/image";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Portfolio", href: "/portfolio" },
    {
      label: "Live Stream",
      href: "/live",
      badge: (
        <span className="flex h-2 w-2 relative">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
        </span>
      ),
    },
    { label: "Services", href: "/#services" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-zinc-950/90 backdrop-blur-md border-b border-zinc-800/80 py-3 shadow-2xl"
            : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 md:px-8 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <Image
              src="/logo-icon.png"
              alt="Samzy Media Production"
              width={200}
              height={150}
              className="w-10 h-auto object-contain transition-transform group-hover:scale-105"
              priority
            />
            <span className="text-white font-bold text-lg tracking-tight uppercase font-heading">
              Samzy<span className="text-zinc-500">Media</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-xs uppercase tracking-wider font-mono transition-colors flex items-center gap-1.5 ${
                    isActive
                      ? "text-white font-semibold border-b-2 border-white pb-0.5"
                      : "text-zinc-400 hover:text-white"
                  }`}
                >
                  {link.label}
                  {link.badge}
                </Link>
              );
            })}
            <Link
              href="/#contact"
              className="px-5 py-2 rounded-none text-xs uppercase tracking-widest font-mono text-black bg-white hover:bg-zinc-200 transition-colors border border-white"
            >
              Contact
            </Link>
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-zinc-300 hover:text-white p-2 border border-zinc-800 bg-zinc-900 rounded-none focus:outline-none"
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label="Open mobile menu"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="fixed inset-0 bg-zinc-950/95 z-50 flex flex-col p-6 backdrop-blur-xl md:hidden border-l border-zinc-800"
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
          >
            <div className="flex justify-between items-center pb-6 border-b border-zinc-800">
              <Link href="/" className="flex items-center gap-2">
                <Image
                  src="/logo-icon.png"
                  alt="Samzy Media Production"
                  width={200}
                  height={150}
                  className="w-10 h-auto"
                />
                <span className="text-white font-bold text-lg uppercase font-heading">SamzyMedia</span>
              </Link>
              <button
                className="text-zinc-400 hover:text-white p-2 rounded-none border border-zinc-800 bg-zinc-900"
                onClick={() => setIsMobileMenuOpen(false)}
                aria-label="Close mobile menu"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <nav className="flex flex-col gap-6 pt-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-2xl font-bold uppercase font-heading text-zinc-200 hover:text-white transition-colors flex items-center justify-between"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <span>{link.label}</span>
                  {link.badge}
                </Link>
              ))}
              <div className="pt-6">
                <Link
                  href="/#contact"
                  className="block w-full py-3.5 text-center rounded-none font-mono text-xs uppercase tracking-widest text-black bg-white hover:bg-zinc-200 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Contact Us
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
