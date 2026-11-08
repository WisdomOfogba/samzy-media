"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { LayoutGrid, PlusCircle, ExternalLink, LogOut, Menu, X, Radio } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

const navItems = [
  {
    label: "Portfolio Works",
    href: "/dashboard",
    icon: LayoutGrid,
  },
  {
    label: "Live Broadcast",
    href: "/dashboard/live",
    icon: Radio,
  },
  {
    label: "Create New Work",
    href: "/dashboard/works/new",
    icon: PlusCircle,
  },
];

export function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <aside
        className={`w-64 z-40 sm:relative fixed h-screen bg-zinc-900/60 backdrop-blur-2xl border-r border-white/10 flex flex-col transition-transform duration-200 ${
          isOpen ? "translate-x-0" : "-translate-x-full sm:translate-x-0"
        }`}
      >
        {/* Brand Header */}
        <div className="p-6 border-b border-white/10 flex items-center justify-between">
          <Link
            href="/dashboard"
            className="flex items-center gap-3 text-white font-bold text-lg font-heading"
          >
            <Image
              src="/logo-icon.png"
              alt="Samzy Media"
              width={100}
              height={100}
              className="w-8 h-auto object-contain"
            />
            <span>Samzy<span className="text-purple-400">CMS</span></span>
          </Link>
          <button
            onClick={() => setIsOpen(false)}
            className="sm:hidden text-zinc-400 hover:text-white p-1 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto">
          <div className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500 px-3 py-2">
            Overview
          </div>

          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              item.href === "/dashboard"
                ? pathname === "/dashboard"
                : pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all",
                  isActive
                    ? "bg-purple-600/20 text-purple-300 border border-purple-500/30 shadow-md shadow-purple-950/20"
                    : "text-zinc-400 hover:text-white hover:bg-white/5"
                )}
              >
                <Icon className={cn("w-4 h-4", isActive ? "text-purple-400" : "text-zinc-400")} />
                <span>{item.label}</span>
              </Link>
            );
          })}

          <div className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500 px-3 pt-6 pb-2">
            Quick Links
          </div>

          <Link
            href="/"
            target="_blank"
            className="flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-medium text-zinc-400 hover:text-white hover:bg-white/5 transition-colors"
          >
            <div className="flex items-center gap-3">
              <ExternalLink className="w-4 h-4 text-zinc-500" />
              <span>Public Website</span>
            </div>
          </Link>

          <Link
            href="/live"
            target="_blank"
            className="flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-medium text-zinc-400 hover:text-white hover:bg-white/5 transition-colors"
          >
            <div className="flex items-center gap-3">
              <Radio className="w-4 h-4 text-purple-400" />
              <span>Public Live Page</span>
            </div>
          </Link>
        </nav>

        {/* User / Logout Footer */}
        <div className="p-4 border-t border-white/10">
          <button
            onClick={async () => {
              await fetch("/api/auth/logout", { method: "POST" });
              window.location.href = "/login";
            }}
            className="w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-medium text-zinc-400 hover:text-red-400 hover:bg-red-950/20 border border-transparent hover:border-red-900/30 transition-all"
          >
            <span>Sign Out</span>
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </aside>

      {/* Mobile Toggle Trigger */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed sm:hidden top-3 left-4 z-30 p-2.5 bg-zinc-900/90 border border-white/10 text-zinc-300 rounded-xl backdrop-blur-md"
        aria-label="Open navigation sidebar"
      >
        <Menu className="w-5 h-5" />
      </button>
    </>
  );
}
