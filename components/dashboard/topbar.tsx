"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Plus, Radio, ArrowUpRight } from "lucide-react";

export function TopBar() {
  const pathname = usePathname();

  const getPageTitle = () => {
    if (pathname === "/dashboard") return "Portfolio Works";
    if (pathname === "/dashboard/live") return "Live Stream Control";
    if (pathname.includes("/works/new")) return "Create Portfolio Item";
    if (pathname.includes("/works/")) return "Edit Portfolio Item";
    return "Dashboard";
  };

  return (
    <header className="border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-md px-6 py-3.5 flex items-center justify-between z-20">
      <div className="flex items-center gap-3">
        <h1 className="text-sm font-mono uppercase tracking-wider font-semibold text-white">
          {getPageTitle()}
        </h1>
        <span className="text-zinc-600 font-mono text-xs hidden sm:inline">•</span>
        <span className="text-xs font-mono text-zinc-500 hidden sm:inline">
          Creator CMS v2.0
        </span>
      </div>

      <div className="flex items-center gap-3">
        <Link
          href="/dashboard/live"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono uppercase tracking-wider text-zinc-300 hover:text-white bg-zinc-900 border border-zinc-800 hover:border-zinc-700 transition-colors rounded-none"
        >
          <Radio className="w-3.5 h-3.5 text-red-500" />
          <span className="hidden sm:inline">Live Settings</span>
        </Link>
        <Link
          href="/dashboard/works/new"
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-mono uppercase tracking-wider font-semibold text-black bg-white hover:bg-zinc-200 transition-colors rounded-none border border-white"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>New Work</span>
        </Link>
      </div>
    </header>
  );
}
