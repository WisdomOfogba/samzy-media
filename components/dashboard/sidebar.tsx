"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { LayoutDashboard, LogOut, Menu, Settings2 } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

const navItems = [
  {
    label: "Works",
    href: "/dashboard",
    icon: <LayoutDashboard className="size-4" />,
  },
  {
    label: "Settings",
    href: "/dashboard/#settings",
    icon: <Settings2 className="size-4" />,
  },
];

export function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <aside
        className={`sm:w-64 w-full z-10 sm:relative fixed h-screen bg-black border-r border-sidebar-border flex flex-col ${
          isOpen ? "flex" : "sm:flex hidden"
        }`}
      >
        <div className="p-2 border-b border-sidebar-border">
          <Link
            href="/"
            className="text-white flex items-center gap-2 font-bold text-2xl"
          >
            <Image
              src="/logo-icon.png"
              alt="Samzy media production logo"
              width={200}
              height={150}
              className="w-12"
            />
            Samzy Media
          </Link>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className={cn(
                "flex items-center gap-3 px-4 py-2 rounded-lg transition-colors",
                pathname === item.href
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "text-sidebar-foreground hover:bg-sidebar-accent/50"
              )}
            >
              <span>{item.icon}</span>
              <span className="font-medium">{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-sidebar-border">
          <button
            onClick={async () => {
              await fetch("/api/auth/logout", { method: "POST" });
              window.location.href = "/login";
            }}
            className="w-full text-red-500 text-left px-4 py-2 text-sm text-sidebar-foreground hover:bg-sidebar-accent/50 flex gap-2 items-center rounded-lg transition-colors"
          >
            Logout <LogOut className="size-4" />
          </button>
        </div>
      </aside>
      <div onClick={() => {
        setIsOpen(!isOpen);
      }} className="fixed sm:hidden top-2 z-20 right-2 p-2 rounded-full bg-white cursor-pointer">
        <Menu className="text-black" />
      </div>
    </>
  );
}
