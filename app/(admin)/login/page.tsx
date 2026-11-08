"use client";

import type React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Lock, Mail } from "lucide-react";

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
    <div className="min-h-screen flex flex-col items-center justify-center bg-zinc-950 text-zinc-100 p-4 selection:bg-white selection:text-black">
      {/* Return Link */}
      <div className="w-full max-w-sm mb-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-zinc-500 hover:text-white transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to Public Site
        </Link>
      </div>

      {/* Minimalist SaaS Login Card */}
      <div className="w-full max-w-sm bg-zinc-950 border border-zinc-800 p-8 rounded-none shadow-2xl">
        <div className="flex flex-col items-start mb-8">
          <div className="flex items-center gap-2.5 mb-4">
            <Image
              src="/logo-icon.png"
              alt="Samzy Media"
              width={100}
              height={100}
              className="w-7 h-auto"
            />
            <span className="font-bold text-sm uppercase tracking-wider font-heading">
              Samzy Media
            </span>
          </div>
          <h1 className="text-xl font-bold tracking-tight uppercase font-heading text-white">
            Creator CMS
          </h1>
          <p className="text-xs text-zinc-500 font-mono mt-1">
            Authenticate to access production controls
          </p>
        </div>

        {error && (
          <div className="mb-6 p-3 bg-red-950/30 border border-red-900/60 text-red-400 text-xs font-mono rounded-none">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <label className="text-[11px] font-mono uppercase tracking-wider text-zinc-400 block">
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
                className="w-full bg-zinc-900/80 border border-zinc-800 text-zinc-100 placeholder:text-zinc-600 text-sm px-3.5 py-2.5 rounded-none focus:outline-none focus:border-zinc-500 focus:bg-zinc-900 transition-colors font-mono"
              />
              <Mail className="w-4 h-4 text-zinc-600 absolute right-3 top-3 pointer-events-none" />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[11px] font-mono uppercase tracking-wider text-zinc-400 block">
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
                className="w-full bg-zinc-900/80 border border-zinc-800 text-zinc-100 placeholder:text-zinc-600 text-sm px-3.5 py-2.5 rounded-none focus:outline-none focus:border-zinc-500 focus:bg-zinc-900 transition-colors font-mono"
              />
              <Lock className="w-4 h-4 text-zinc-600 absolute right-3 top-3 pointer-events-none" />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-white text-black hover:bg-zinc-200 transition-colors font-mono text-xs uppercase tracking-widest font-semibold border border-white rounded-none disabled:opacity-50 mt-2"
          >
            {loading ? "Authenticating..." : "Sign In"}
          </button>
        </form>
      </div>

      <p className="text-[11px] font-mono text-zinc-600 mt-8">
        Protected by session JWT verification
      </p>
    </div>
  );
}
