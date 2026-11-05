"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CloudinaryUpload } from "@/components/dashboard/cloudinary-upload"
import { LoadingSpinner } from "@/components/dashboard/loading-spinner"
import { workValidationSchema } from "@/lib/validations"

interface WorkFormData {
  title: string
  category: "Animations" | "Birthday Designs" | "Graphics Design" | "Logo Montage" | "Motion Graphics"
  type: "image" | "video"
  mediaUrl: string
  featured: boolean
  story?: string
}

interface WorkFormProps {
  workId?: string
}

export function WorkForm({ workId }: WorkFormProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(!!workId)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState("")
  const [formData, setFormData] = useState<WorkFormData>({
    title: "",
    category: "Animations",
    type: "image",
    mediaUrl: "",
    featured: false,
    story: "",
  })

  useEffect(() => {
    if (workId) {
      fetchWork(workId)
    }
  }, [workId])

  const fetchWork = async (id: string) => {
    try {
      const response = await fetch(`/api/portfolio/${id}`)
      if (!response.ok) throw new Error("Failed to fetch work")
      const work = await response.json()
      setFormData({
        title: work.title || "",
        category: work.category || "Animations",
        type: work.type || "image",
        mediaUrl: work.mediaUrl || "",
        featured: !!work.featured,
        story: work.story || "",
      })
    } catch (err) {
      setError("Failed to load work")
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSaving(true)

    // Validate using Zod schema to mirror backend validation
    const validation = workValidationSchema.safeParse(formData)
    if (!validation.success) {
      const firstError = Object.values(validation.error.flatten().fieldErrors).flat()[0]
      setError(firstError || "Please check the form for errors")
      setSaving(false)
      return
    }

    try {
      const url = workId ? `/api/portfolio/${workId}` : "/api/portfolio"
      const method = workId ? "PUT" : "POST"

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validation.data),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.error || "Failed to save work")
      }

      router.push("/dashboard")
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save work")
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <LoadingSpinner />
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl space-y-6">
      {error && (
        <div className="bg-destructive/10 border border-destructive/30 text-destructive px-4 py-2 rounded-md">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Description & Case Study */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Project Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium">Title *</label>
                <Input
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Project title"
                  disabled={saving}
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium">Category *</label>
                <select
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      category: e.target.value as
                        | "Animations"
                        | "Birthday Designs"
                        | "Graphics Design"
                        | "Logo Montage"
                        | "Motion Graphics",
                    })
                  }
                  className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground"
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
                <label className="block text-sm font-medium">Type *</label>
                <div className="flex gap-4">
                  {["image", "video"].map((t) => (
                    <label key={t} className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="type"
                        required
                        value={t}
                        checked={formData.type === t}
                        onChange={(e) => setFormData({ ...formData, type: e.target.value as "image" | "video" })}
                        disabled={saving}
                      />
                      <span className="capitalize">{t}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="featured"
                  checked={formData.featured}
                  onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                  disabled={saving}
                />
                <label htmlFor="featured" className="text-sm font-medium">
                  Featured Work
                </label>
              </div>

              {/* Case Study / Story field */}
              <div className="space-y-2 pt-2 border-t border-border">
                <label className="block text-sm font-medium">Case Study Story</label>
                {/* // TODO: Replace with TipTap/Rich Text Editor */}
                <textarea
                  value={formData.story || ""}
                  onChange={(e) => setFormData({ ...formData, story: e.target.value })}
                  placeholder="Write the story, creative direction, and production details behind this work..."
                  rows={6}
                  className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  disabled={saving}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Media *</CardTitle>
            </CardHeader>
            <CardContent>
              <CloudinaryUpload
                folder={formData.category}
                accept={formData.type === "video" ? "video/*" : "image/*"}
                onUpload={(url) => setFormData({ ...formData, mediaUrl: url })}
                currentUrl={formData.mediaUrl}
                disabled={saving}
              />
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Preview */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Preview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {formData.mediaUrl && (
                <div className="space-y-2">
                  <p className="text-sm font-medium">Media</p>
                  {formData.type === "video" ? (
                    <video src={formData.mediaUrl} className="w-full h-40 object-cover rounded-lg bg-muted" controls />
                  ) : (
                    <img
                      src={formData.mediaUrl || "/placeholder.svg"}
                      alt="Media preview"
                      className="w-full h-40 object-cover rounded-lg"
                    />
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="flex gap-3 justify-end">
        <Button type="button" variant="outline" onClick={() => router.push("/dashboard")} disabled={saving}>
          Cancel
        </Button>
        <Button type="submit" disabled={saving}>
          {saving ? "Saving..." : workId ? "Update Work" : "Add Work"}
        </Button>
      </div>
    </form>
  )
}
