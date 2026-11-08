import type React from "react";
import { Sidebar } from "@/components/dashboard/sidebar";
import { TopBar } from "@/components/dashboard/topbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-black text-zinc-100 overflow-hidden font-sans relative">
      {/* Ambient background glow */}
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-purple-900/10 rounded-full blur-3xl pointer-events-none" />

      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden bg-black/60 backdrop-blur-3xl z-10">
        <TopBar />
        <main className="flex-1 overflow-y-auto p-6 md:p-10">
          <div className="max-w-6xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
