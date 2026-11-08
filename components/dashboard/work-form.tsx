"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { CloudinaryUpload } from "@/components/dashboard/cloudinary-upload";
import { LoadingSpinner } from "@/components/dashboard/loading-spinner";
import { workValidationSchema } from "@/lib/validations";

interface WorkFormData {
  title: string;
  category: "Animations" | "Birthday Designs" | "Graphics Design" | "Logo Montage" | "Motion Graphics";
  type: "image" | "video";
  mediaUrl: string;
  featured: boolean;
  story?: string;
}

interface WorkFormProps {
  workId?: string;
}

export function WorkForm({ workId }: WorkFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(!!workId);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState<WorkFormData>({
    title: "",
    category: "Animations",
    type: "image",
    mediaUrl: "",
    featured: false,
    story: "",
  });

  useEffect(() => {
    if (workId) {
      fetchWork(workId);
    }
  }, [workId]);

  const fetchWork = async (id: string) => {
    try {
      const response = await fetch(`/api/portfolio/${id}`);
      if (!response.ok) throw new Error("Failed to fetch work");
      const work = await response.json();
      setFormData({
        title: work.title || "",
        category: work.category || "Animations",
        type: work.type || "image",
        mediaUrl: work.mediaUrl || "",
        featured: !!work.featured,
        story: work.story || "",
      });
    } catch {
      setError("Failed to load work details");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSaving(true);

    const validation = workValidationSchema.safeParse(formData);
    if (!validation.success) {
      const firstError = Object.values(validation.error.flatten().fieldErrors).flat()[0];
      setError(firstError || "Please check the form for errors");
      setSaving(false);
      return;
    }

    try {
      const url = workId ? `/api/portfolio/${workId}` : "/api/portfolio";
      const method = workId ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validation.data),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || "Failed to save work");
      }

      router.push("/dashboard");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save work");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-950/20 border border-red-900/50 text-red-400 px-4 py-3 text-xs font-mono rounded-none">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Form Fields */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-zinc-950 border border-zinc-800 p-6 rounded-none space-y-5">
            <h2 className="text-sm font-mono uppercase tracking-wider font-semibold text-white border-b border-zinc-800 pb-3">
              Project Specification
            </h2>

            <div className="space-y-2">
              <label className="text-xs font-mono uppercase tracking-wider text-zinc-400 block">
                Title *
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="e.g. Apex Motion Identity"
                disabled={saving}
                className="w-full bg-zinc-900 border border-zinc-800 text-zinc-100 placeholder:text-zinc-600 text-sm px-3.5 py-2.5 rounded-none focus:outline-none focus:border-zinc-500 font-mono"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-mono uppercase tracking-wider text-zinc-400 block">
                Category *
              </label>
              <select
                value={formData.category}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    category: e.target.value as any,
                  })
                }
                className="w-full bg-zinc-900 border border-zinc-800 text-zinc-100 text-sm px-3.5 py-2.5 rounded-none focus:outline-none focus:border-zinc-500 font-mono"
                required
                disabled={saving}
              >
                <option value="Animations">Animations</option>
                <option value="Birthday Designs">Birthday Designs</option>
                <option value="Graphics Design">Graphics Design</option>
                <option value="Logo Montage">Logo Montage</option>
                <option value="Motion Graphics">Motion Graphics</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-mono uppercase tracking-wider text-zinc-400 block">
                Media Format *
              </label>
              <div className="flex gap-6 pt-1">
                {(["image", "video"] as const).map((t) => (
                  <label key={t} className="flex items-center gap-2 cursor-pointer font-mono text-xs uppercase tracking-wider">
                    <input
                      type="radio"
                      name="type"
                      required
                      value={t}
                      checked={formData.type === t}
                      onChange={(e) => setFormData({ ...formData, type: e.target.value as "image" | "video" })}
                      disabled={saving}
                      className="accent-white"
                    />
                    <span className="text-zinc-300">{t}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <input
                type="checkbox"
                id="featured"
                checked={formData.featured}
                onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                disabled={saving}
                className="w-4 h-4 accent-white rounded-none cursor-pointer"
              />
              <label htmlFor="featured" className="text-xs font-mono uppercase tracking-wider text-zinc-300 cursor-pointer">
                Pin as Featured Item
              </label>
            </div>

            {/* Case Study / Story textarea */}
            <div className="space-y-2 pt-4 border-t border-zinc-800">
              <label className="text-xs font-mono uppercase tracking-wider text-zinc-400 block">
                Case Study Story (Rich Narrative)
              </label>
              {/* // TODO: Replace with TipTap/Rich Text Editor */}
              <textarea
                value={formData.story || ""}
                onChange={(e) => setFormData({ ...formData, story: e.target.value })}
                placeholder="Write the creative direction, concept breakdown, toolchain, and production context for this work..."
                rows={7}
                className="w-full bg-zinc-900 border border-zinc-800 text-zinc-100 placeholder:text-zinc-600 text-sm p-3.5 rounded-none focus:outline-none focus:border-zinc-500 font-sans leading-relaxed"
                disabled={saving}
              />
            </div>
          </div>

          {/* Media Asset Upload */}
          <div className="bg-zinc-950 border border-zinc-800 p-6 rounded-none space-y-4">
            <h2 className="text-sm font-mono uppercase tracking-wider font-semibold text-white border-b border-zinc-800 pb-3">
              Media Asset *
            </h2>
            <CloudinaryUpload
              folder={formData.category}
              accept={formData.type === "video" ? "video/*" : "image/*"}
              onUpload={(url) => setFormData({ ...formData, mediaUrl: url })}
              currentUrl={formData.mediaUrl}
              disabled={saving}
            />
          </div>
        </div>

        {/* Right Column: Asset Preview */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-zinc-950 border border-zinc-800 p-6 rounded-none space-y-4">
            <h2 className="text-sm font-mono uppercase tracking-wider font-semibold text-white border-b border-zinc-800 pb-3">
              Media Preview
            </h2>
            {formData.mediaUrl ? (
              <div className="space-y-2">
                {formData.type === "video" ? (
                  <video
                    src={formData.mediaUrl}
                    className="w-full aspect-video object-contain bg-black border border-zinc-800 rounded-none"
                    controls
                    disablePictureInPicture
                  />
                ) : (
                  <img
                    src={formData.mediaUrl}
                    alt="Media preview"
                    className="w-full aspect-video object-contain bg-black border border-zinc-800 rounded-none"
                  />
                )}
                <div className="text-[11px] font-mono text-zinc-500 truncate pt-1">
                  {formData.mediaUrl}
                </div>
              </div>
            ) : (
              <div className="py-12 text-center text-xs font-mono uppercase tracking-wider text-zinc-600 border border-dashed border-zinc-800">
                No media uploaded
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div className="flex gap-3 justify-end pt-4 border-t border-zinc-800">
        <button
          type="button"
          onClick={() => router.push("/dashboard")}
          disabled={saving}
          className="px-5 py-2.5 text-xs font-mono uppercase tracking-wider text-zinc-400 hover:text-white bg-zinc-900 border border-zinc-800 hover:border-zinc-700 transition-colors rounded-none"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={saving}
          className="px-6 py-2.5 text-xs font-mono uppercase tracking-widest font-semibold text-black bg-white hover:bg-zinc-200 transition-colors rounded-none border border-white disabled:opacity-50"
        >
          {saving ? "Saving..." : workId ? "Update Project" : "Publish Project"}
        </button>
      </div>
    </form>
  );
}
