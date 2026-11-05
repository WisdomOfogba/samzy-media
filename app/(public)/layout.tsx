import type React from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { ProjectsProvider } from "@/context/ProjectsContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <ProjectsProvider>
        <Navbar />
        {children}
        <Footer />
      </ProjectsProvider>
    </div>
  );
}
