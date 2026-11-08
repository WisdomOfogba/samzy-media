"use client";

import type React from "react";
import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Mail, Phone, MapPin, Check, AlertCircle } from "lucide-react";

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
          text: data.message || "Your inquiry has been delivered directly to our production team.",
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
    <section id="contact" className="w-full py-24 px-4 md:px-8 lg:px-12 bg-zinc-950 text-white border-b border-zinc-800/80">
      <div className="mx-auto max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left Column: Direct Inquiries */}
          <motion.div
            initial={{ opacity: 0, x: -15 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-xs font-mono uppercase tracking-widest text-zinc-500 mb-2">
              <span>[ Direct Inquiries ]</span>
            </div>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight uppercase mb-6 font-heading">
              Initiate a Project.
            </h2>
            <p className="text-base sm:text-lg mb-10 text-zinc-400 max-w-md leading-relaxed font-normal">
              Whether you are looking for broadcast packaging, 3D character world building, or multi-camera streaming direction, our studio is ready.
            </p>

            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 border border-zinc-800 bg-zinc-900/60 rounded-none">
                <div className="h-10 w-10 rounded-none bg-zinc-800 border border-zinc-700 flex items-center justify-center text-white">
                  <Mail className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="text-xs font-mono uppercase tracking-wider text-zinc-400">Direct Email</h3>
                  <p className="text-sm font-mono text-zinc-200">ssylvanus89@gmail.com</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 border border-zinc-800 bg-zinc-900/60 rounded-none">
                <div className="h-10 w-10 rounded-none bg-zinc-800 border border-zinc-700 flex items-center justify-center text-white">
                  <Phone className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="text-xs font-mono uppercase tracking-wider text-zinc-400">Production Studio Line</h3>
                  <p className="text-sm font-mono text-zinc-200">+234 814 569 5589</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 border border-zinc-800 bg-zinc-900/60 rounded-none">
                <div className="h-10 w-10 rounded-none bg-zinc-800 border border-zinc-700 flex items-center justify-center text-white">
                  <MapPin className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="text-xs font-mono uppercase tracking-wider text-zinc-400">Studio Location</h3>
                  <p className="text-sm font-mono text-zinc-200">LCA, Oregun, Ikeja Lagos, Nigeria</p>
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
              className="space-y-5 bg-zinc-950 p-6 md:p-8 rounded-none border border-zinc-800"
            >
              {feedback && (
                <div
                  className={`p-3.5 border rounded-none text-xs font-mono flex items-center gap-2.5 ${
                    feedback.type === "success"
                      ? "bg-emerald-950/20 border-emerald-800/40 text-emerald-400"
                      : "bg-red-950/20 border-red-800/40 text-red-400"
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
                  <label htmlFor="name" className="text-[11px] font-mono uppercase tracking-wider text-zinc-400 block">
                    Full Name *
                  </label>
                  <input
                    id="name"
                    name="name"
                    value={formState.name}
                    onChange={handleChange}
                    placeholder="Jane Doe"
                    required
                    className="w-full bg-zinc-900 border border-zinc-800 text-zinc-100 placeholder:text-zinc-600 text-sm px-3.5 py-2.5 rounded-none focus:outline-none focus:border-zinc-500 font-mono"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="text-[11px] font-mono uppercase tracking-wider text-zinc-400 block">
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
                    className="w-full bg-zinc-900 border border-zinc-800 text-zinc-100 placeholder:text-zinc-600 text-sm px-3.5 py-2.5 rounded-none focus:outline-none focus:border-zinc-500 font-mono"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="subject" className="text-[11px] font-mono uppercase tracking-wider text-zinc-400 block">
                  Project Subject *
                </label>
                <input
                  id="subject"
                  name="subject"
                  value={formState.subject}
                  onChange={handleChange}
                  placeholder="e.g. Broadcast Motion System & Opening Montage"
                  required
                  className="w-full bg-zinc-900 border border-zinc-800 text-zinc-100 placeholder:text-zinc-600 text-sm px-3.5 py-2.5 rounded-none focus:outline-none focus:border-zinc-500 font-mono"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-[11px] font-mono uppercase tracking-wider text-zinc-400 block">
                  Project Scope & Timeline *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formState.message}
                  onChange={handleChange}
                  placeholder="Describe your creative requirements, expected delivery timeline, and deliverables..."
                  required
                  rows={5}
                  className="w-full bg-zinc-900 border border-zinc-800 text-zinc-100 placeholder:text-zinc-600 text-sm p-3.5 rounded-none focus:outline-none focus:border-zinc-500 font-sans"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 bg-white text-black hover:bg-zinc-200 transition-colors font-mono text-xs uppercase tracking-widest font-semibold border border-white rounded-none flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <span>{isLoading ? "Transmitting..." : "Send Inquiry"}</span>
                <Send className="h-3.5 w-3.5" />
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
