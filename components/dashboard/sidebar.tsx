"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { LayoutGrid, Radio, PlusCircle, ExternalLink, LogOut, Menu, X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

const navItems = [
  {
    label: "Portfolio Works",
    href: "/dashboard",
    icon: LayoutGrid,
  },
  {
    label: "Live Stream Control",
    href: "/dashboard/live",
    icon: Radio,
    badge: "Live",
  },
  {
    label: "New Project",
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
        className={`w-64 z-40 sm:relative fixed h-screen bg-zinc-950 border-r border-zinc-800 flex flex-col transition-transform duration-200 ${
          isOpen ? "translate-x-0" : "-translate-x-full sm:translate-x-0"
        }`}
      >
        {/* Brand Header */}
        <div className="p-5 border-b border-zinc-800 flex items-center justify-between">
          <Link
            href="/dashboard"
            className="flex items-center gap-2.5 text-white font-bold text-sm uppercase tracking-wider font-heading"
          >
            <Image
              src="/logo-icon.png"
              alt="Samzy Media"
              width={100}
              height={100}
              className="w-7 h-auto"
            />
            <span>Samzy CMS</span>
          </Link>
          <button
            onClick={() => setIsOpen(false)}
            className="sm:hidden text-zinc-400 hover:text-white p-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          <div className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 px-3 py-2">
            Navigation
          </div>

          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              item.href === "/dashboard"
                ? pathname === "/dashboard"
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "flex items-center justify-between px-3.5 py-2.5 text-xs font-mono uppercase tracking-wider transition-colors rounded-none border",
                  isActive
                    ? "bg-zinc-900 text-white border-zinc-700 font-medium"
                    : "text-zinc-400 hover:text-white hover:bg-zinc-900/60 border-transparent"
                )}
              >
                <div className="flex items-center gap-3">
                  <Icon className={cn("w-4 h-4", isActive ? "text-white" : "text-zinc-500")} />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className="text-[9px] font-mono px-1.5 py-0.5 bg-red-950/80 text-red-400 border border-red-800/60 uppercase">
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}

          <div className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 px-3 pt-6 pb-2">
            Quick Links
          </div>

          <Link
            href="/"
            target="_blank"
            className="flex items-center justify-between px-3.5 py-2.5 text-xs font-mono uppercase tracking-wider text-zinc-400 hover:text-white hover:bg-zinc-900/60 transition-colors border border-transparent"
          >
            <div className="flex items-center gap-3">
              <ExternalLink className="w-4 h-4 text-zinc-500" />
              <span>Public Site</span>
            </div>
          </Link>
          <Link
            href="/live"
            target="_blank"
            className="flex items-center justify-between px-3.5 py-2.5 text-xs font-mono uppercase tracking-wider text-zinc-400 hover:text-white hover:bg-zinc-900/60 transition-colors border border-transparent"
          >
            <div className="flex items-center gap-3">
              <Radio className="w-4 h-4 text-zinc-500" />
              <span>Live Page</span>
            </div>
          </Link>
        </nav>

        {/* User / Logout Footer */}
        <div className="p-4 border-t border-zinc-800">
          <button
            onClick={async () => {
              await fetch("/api/auth/logout", { method: "POST" });
              window.location.href = "/login";
            }}
            className="w-full flex items-center justify-between px-3.5 py-2.5 text-xs font-mono uppercase tracking-wider text-zinc-400 hover:text-red-400 hover:bg-red-950/20 transition-colors border border-transparent hover:border-red-900/40 rounded-none"
          >
            <span>Sign Out</span>
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </aside>

      {/* Mobile Toggle Trigger */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed sm:hidden top-3 left-4 z-30 p-2 bg-zinc-900 border border-zinc-800 text-zinc-300 rounded-none"
        aria-label="Open navigation sidebar"
      >
        <Menu className="w-5 h-5" />
      </button>
    </>
  );
}
