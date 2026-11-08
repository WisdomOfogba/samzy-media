import type React from "react";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans">
      {children}
    </div>
  );
}
