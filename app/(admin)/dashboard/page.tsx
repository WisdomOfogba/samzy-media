"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Plus, Radio, Film } from "lucide-react";
import { WorkCard } from "@/components/dashboard/work-card";
import { LoadingSpinner } from "@/components/dashboard/loading-spinner";
import { ConfirmDialog } from "@/components/dashboard/confirm-dialog";

interface PortfolioWork {
  _id: string;
  title: string;
  thumbnail: string;
  mediaUrl: string;
  category: string;
  type: "image" | "video";
  featured: boolean;
  story?: string;
}

export default function DashboardPage() {
  const router = useRouter();
  const [works, setWorks] = useState<PortfolioWork[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  useEffect(() => {
    fetchWorks();
  }, []);

  const fetchWorks = async () => {
    try {
      const response = await fetch("/api/portfolio");
      if (!response.ok) {
        throw new Error("Failed to fetch works");
      }
      const data = await response.json();
      setWorks(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching works:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    setDeleting(id);
    try {
      const response = await fetch(`/api/portfolio/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete work");
      }

      setWorks(works.filter((w) => w._id !== id));
      setDeleteConfirm(null);
    } catch (error) {
      console.error("Error deleting work:", error);
    } finally {
      setDeleting(null);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Dashboard Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-zinc-800">
        <div>
          <div className="text-xs font-mono uppercase tracking-widest text-zinc-500 mb-1">
            Media Management
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold uppercase tracking-tight text-white font-heading">
            Portfolio Items ({works.length})
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1">
            Publish, edit, and organize portfolio productions and case studies.
          </p>
        </div>

        <div className="flex items-center gap-3 self-start sm:self-auto">
          <Link
            href="/dashboard/live"
            className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-mono uppercase tracking-wider text-zinc-300 hover:text-white bg-zinc-900 border border-zinc-800 hover:border-zinc-700 transition-colors rounded-none"
          >
            <Radio className="w-3.5 h-3.5 text-red-500" />
            <span>Live Control</span>
          </Link>
          <Link
            href="/dashboard/works/new"
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-mono uppercase tracking-wider font-semibold text-black bg-white hover:bg-zinc-200 transition-colors rounded-none border border-white"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Work</span>
          </Link>
        </div>
      </div>

      {works.length === 0 ? (
        <div className="border border-zinc-800 bg-zinc-950 p-12 text-center rounded-none">
          <Film className="w-8 h-8 text-zinc-600 mx-auto mb-3" />
          <p className="text-sm font-mono uppercase tracking-wider text-zinc-400 mb-1">
            No portfolio items in database
          </p>
          <p className="text-xs text-zinc-600 font-mono mb-6">
            Add your first video montage, motion graphic, or design.
          </p>
          <Link
            href="/dashboard/works/new"
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-mono uppercase tracking-wider font-semibold text-black bg-white hover:bg-zinc-200 transition-colors rounded-none"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Create First Work</span>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {works.map((work) => (
            <WorkCard
              key={work._id}
              work={work}
              onEdit={() => router.push(`/dashboard/works/${work._id}`)}
              onDelete={() => setDeleteConfirm(work._id)}
            />
          ))}
        </div>
      )}

      <ConfirmDialog
        isOpen={!!deleteConfirm}
        title="Delete Work"
        description="Are you sure you want to permanently delete this portfolio work? This action cannot be undone."
        onConfirm={() => deleteConfirm && handleDelete(deleteConfirm)}
        onCancel={() => setDeleteConfirm(null)}
        isLoading={!!deleting}
      />
    </div>
  );
}
