"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Plus, Film, Sparkles } from "lucide-react";
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
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-950/60 border border-purple-800/40 text-xs font-medium text-purple-300 mb-2">
            <Sparkles className="w-3 h-3" />
            <span>Production Catalog</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-bold tracking-tight text-white font-heading">
            Portfolio Items ({works.length})
          </h1>
          <p className="text-sm text-zinc-400 mt-1">
            Publish, edit, and organize portfolio productions and case studies.
          </p>
        </div>

        <Link
          href="/dashboard/works/new"
          className="inline-flex items-center gap-2 px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-white bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 transition-all rounded-full shadow-lg shadow-purple-950/40 hover:scale-105 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Work</span>
        </Link>
      </div>

      {works.length === 0 ? (
        <div className="border border-white/10 bg-zinc-900/40 backdrop-blur-md p-16 text-center rounded-3xl">
          <Film className="w-10 h-10 text-purple-400 mx-auto mb-4" />
          <p className="text-base font-semibold text-zinc-200 mb-1">
            No portfolio items in database
          </p>
          <p className="text-xs text-zinc-400 mb-6 max-w-sm mx-auto">
            Add your first video montage, motion graphics system, or creative design.
          </p>
          <Link
            href="/dashboard/works/new"
            className="inline-flex items-center gap-2 px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-white bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 transition-all rounded-full shadow-lg"
          >
            <Plus className="w-4 h-4" />
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
