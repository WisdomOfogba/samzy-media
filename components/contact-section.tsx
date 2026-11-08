"use client";

import type React from "react";
import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Mail, Phone, MapPin, Check, AlertCircle, Sparkles } from "lucide-react";

export default function ContactSection() {
  const [isLoading, setIsLoading] = useState(false);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFeedback(null);

    try {
      setIsLoading(true);

      if (!formState.name || !formState.email || !formState.subject || !formState.message) {
        setFeedback({ type: "error", text: "Please fill in all required fields." });
        return;
      }

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formState),
      });

      const data = await res.json();

      if (res.ok) {
        setFeedback({
          type: "success",
          text: data.message || "Your message has been delivered to our creative team.",
        });
        setFormState({ name: "", email: "", subject: "", message: "" });
      } else {
        setFeedback({ type: "error", text: data.error || "Failed to deliver message." });
      }
    } catch {
      setFeedback({ type: "error", text: "A network error occurred. Please try again." });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="contact" className="w-full py-24 px-4 md:px-8 lg:px-12 bg-black text-white relative overflow-hidden">
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-700/15 rounded-full blur-3xl pointer-events-none" />

      <div className="mx-auto max-w-6xl relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left Column: Direct Inquiries */}
          <motion.div
            initial={{ opacity: 0, x: -15 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-purple-400 mb-3 px-3 py-1 rounded-full bg-purple-950/40 border border-purple-800/30">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Get in Touch</span>
            </div>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6 font-heading">
              Let's Create{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-amber-300">
                Together
              </span>
            </h2>
            <p className="text-base sm:text-lg mb-10 text-zinc-300 max-w-md leading-relaxed font-normal">
              Whether you are looking for broadcast packaging, 3D character world building, or multi-camera streaming direction, our studio is ready.
            </p>

            <div className="space-y-4">
              <div className="flex items-center gap-4 p-5 border border-white/10 bg-zinc-900/50 backdrop-blur-md rounded-2xl hover:border-purple-500/30 transition-all">
                <div className="h-12 w-12 rounded-xl bg-purple-950/60 border border-purple-800/40 flex items-center justify-center text-purple-400">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-xs uppercase tracking-wider text-zinc-400 font-medium">Direct Email</h3>
                  <p className="text-sm font-semibold text-zinc-200">ssylvanus89@gmail.com</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-5 border border-white/10 bg-zinc-900/50 backdrop-blur-md rounded-2xl hover:border-purple-500/30 transition-all">
                <div className="h-12 w-12 rounded-xl bg-purple-950/60 border border-purple-800/40 flex items-center justify-center text-purple-400">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-xs uppercase tracking-wider text-zinc-400 font-medium">Production Studio Line</h3>
                  <p className="text-sm font-semibold text-zinc-200">+234 814 569 5589</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-5 border border-white/10 bg-zinc-900/50 backdrop-blur-md rounded-2xl hover:border-purple-500/30 transition-all">
                <div className="h-12 w-12 rounded-xl bg-purple-950/60 border border-purple-800/40 flex items-center justify-center text-purple-400">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-xs uppercase tracking-wider text-zinc-400 font-medium">Studio Location</h3>
                  <p className="text-sm font-semibold text-zinc-200">LCA, Oregun, Ikeja Lagos, Nigeria</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 15 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <form
              onSubmit={handleSubmit}
              className="space-y-5 bg-zinc-900/50 backdrop-blur-2xl p-6 md:p-8 rounded-3xl border border-white/10 shadow-2xl shadow-purple-950/30"
            >
              {feedback && (
                <div
                  className={`p-4 border rounded-xl text-xs flex items-center gap-2.5 ${
                    feedback.type === "success"
                      ? "bg-emerald-950/30 border-emerald-800/40 text-emerald-400"
                      : "bg-red-950/30 border-red-800/40 text-red-400"
                  }`}
                >
                  {feedback.type === "success" ? (
                    <Check className="w-4 h-4 shrink-0" />
                  ) : (
                    <AlertCircle className="w-4 h-4 shrink-0" />
                  )}
                  <span>{feedback.text}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-xs uppercase tracking-wider text-zinc-300 font-medium block">
                    Full Name *
                  </label>
                  <input
                    id="name"
                    name="name"
                    value={formState.name}
                    onChange={handleChange}
                    placeholder="Jane Doe"
                    required
                    className="w-full bg-zinc-800/60 border border-white/10 text-zinc-100 placeholder:text-zinc-500 text-sm px-4 py-3 rounded-xl focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="text-xs uppercase tracking-wider text-zinc-300 font-medium block">
                    Email Address *
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formState.email}
                    onChange={handleChange}
                    placeholder="jane@organization.com"
                    required
                    className="w-full bg-zinc-800/60 border border-white/10 text-zinc-100 placeholder:text-zinc-500 text-sm px-4 py-3 rounded-xl focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="subject" className="text-xs uppercase tracking-wider text-zinc-300 font-medium block">
                  Project Subject *
                </label>
                <input
                  id="subject"
                  name="subject"
                  value={formState.subject}
                  onChange={handleChange}
                  placeholder="e.g. Broadcast Motion Graphics & Opening Montage"
                  required
                  className="w-full bg-zinc-800/60 border border-white/10 text-zinc-100 placeholder:text-zinc-500 text-sm px-4 py-3 rounded-xl focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-xs uppercase tracking-wider text-zinc-300 font-medium block">
                  Project Scope & Details *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formState.message}
                  onChange={handleChange}
                  placeholder="Tell us about your project vision, timeline, and deliverables..."
                  required
                  rows={5}
                  className="w-full bg-zinc-800/60 border border-white/10 text-zinc-100 placeholder:text-zinc-500 text-sm p-4 rounded-xl focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all font-sans"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-4 bg-gradient-to-r from-purple-600 via-purple-700 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-semibold text-sm transition-all rounded-full flex items-center justify-center gap-2 shadow-xl shadow-purple-950/50 hover:scale-[1.02] disabled:opacity-50"
              >
                <span>{isLoading ? "Transmitting..." : "Send Message"}</span>
                <Send className="h-4 w-4" />
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
