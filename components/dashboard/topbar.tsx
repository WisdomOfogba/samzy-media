"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Plus, Radio } from "lucide-react";

export function TopBar() {
  const pathname = usePathname();

  const getPageTitle = () => {
    if (pathname === "/dashboard") return "Portfolio Works";
    if (pathname === "/dashboard/live") return "Live Broadcast Management";
    if (pathname.includes("/works/new")) return "Create New Work";
    if (pathname.includes("/works/")) return "Edit Portfolio Work";
    return "Dashboard";
  };

  return (
    <header className="border-b border-white/10 bg-zinc-900/40 backdrop-blur-xl px-6 py-4 flex items-center justify-between z-20">
      <div className="flex items-center gap-3">
        <h1 className="text-base font-bold text-white font-heading">
          {getPageTitle()}
        </h1>
        <span className="text-zinc-600 hidden sm:inline">•</span>
        <span className="text-xs text-zinc-400 hidden sm:inline">
          Creator CMS
        </span>
      </div>

      <div className="flex items-center gap-3">
        <Link
          href="/dashboard/live"
          className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-zinc-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-all rounded-full backdrop-blur-md"
        >
          <Radio className="w-3.5 h-3.5 text-purple-400" />
          <span className="hidden sm:inline">Live Stream</span>
        </Link>
        <Link
          href="/dashboard/works/new"
          className="inline-flex items-center gap-2 px-5 py-2 text-xs font-semibold uppercase tracking-wider text-white bg-gradient-to-r from-purple-600 via-purple-700 to-pink-600 hover:from-purple-500 hover:to-pink-500 transition-all rounded-full shadow-md shadow-purple-950/40 hover:scale-105"
        >
          <Plus className="w-4 h-4" />
          <span>New Work</span>
        </Link>
      </div>
    </header>
  );
}
