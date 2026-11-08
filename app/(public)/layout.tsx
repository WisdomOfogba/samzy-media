import type React from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { ProjectsProvider } from "@/context/ProjectsContext";

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col justify-between">
      <ProjectsProvider>
        <Navbar />
        <div className="flex-1">
          {children}
        </div>
        <Footer />
      </ProjectsProvider>
    </div>
  );
}
