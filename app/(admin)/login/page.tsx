"use client";

import type React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Lock, Mail, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Authentication failed");
        return;
      }

      router.push("/dashboard");
    } catch {
      setError("An unexpected network error occurred. Please retry.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white p-4 relative overflow-hidden selection:bg-purple-600 selection:text-white">
      {/* Ambient Gradient Glow Orbs */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-purple-700/25 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-pink-600/25 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute inset-0 bg-radial-gradient opacity-60 pointer-events-none" />

      {/* Return Link */}
      <div className="w-full max-w-md mb-6 relative z-10">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to website
        </Link>
      </div>

      {/* Modern Glassmorphic Login Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-md bg-zinc-900/60 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 md:p-10 shadow-2xl shadow-purple-950/40 relative z-10"
      >
        <div className="flex flex-col items-start mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Image
              src="/logo-icon.png"
              alt="Samzy Media"
              width={100}
              height={100}
              className="w-9 h-auto object-contain"
            />
            <span className="font-bold text-lg font-heading">
              Samzy<span className="text-purple-400">Media</span>
            </span>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-950/60 border border-purple-800/40 text-xs font-medium text-purple-300 mb-2">
            <Sparkles className="w-3 h-3" />
            <span>Admin Control Panel</span>
          </div>

          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-white font-heading">
            Welcome Back
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1">
            Authenticate to manage portfolio works and productions
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-950/30 border border-red-800/50 text-red-300 text-xs rounded-xl">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <label className="text-xs font-medium text-zinc-300 block">
              Admin Email
            </label>
            <div className="relative">
              <input
                type="email"
                required
                placeholder="admin@samzymedia.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
                className="w-full bg-zinc-800/50 border border-zinc-700/80 rounded-xl px-4 py-3 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              />
              <Mail className="w-4 h-4 text-zinc-500 absolute right-3.5 top-3.5 pointer-events-none" />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-medium text-zinc-300 block">
              Password
            </label>
            <div className="relative">
              <input
                type="password"
                required
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
                className="w-full bg-zinc-800/50 border border-zinc-700/80 rounded-xl px-4 py-3 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              />
              <Lock className="w-4 h-4 text-zinc-500 absolute right-3.5 top-3.5 pointer-events-none" />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 bg-gradient-to-r from-purple-600 via-purple-700 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-semibold text-sm transition-all rounded-xl shadow-lg shadow-purple-900/40 hover:scale-[1.02] disabled:opacity-50 mt-2"
          >
            {loading ? "Authenticating..." : "Sign In to Dashboard"}
          </button>
        </form>
      </motion.div>

      <p className="text-xs text-zinc-600 mt-8 relative z-10">
        Protected by cryptographic session JWT verification
      </p>
    </div>
  );
}
