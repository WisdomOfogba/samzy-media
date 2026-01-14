"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { WorkCard } from "@/components/dashboard/work-card"
import { LoadingSpinner } from "@/components/dashboard/loading-spinner"
import { ConfirmDialog } from "@/components/dashboard/confirm-dialog"

interface PortfolioWork {
  _id: string
  title: string
  thumbnail: string
  mediaUrl: string
  category: string
  type: "image" | "video"
  featured: boolean
}

export default function DashboardPage() {
  const router = useRouter()
  const [works, setWorks] = useState<PortfolioWork[]>([])
  const [loading, setLoading] = useState(true)
  const [deleting, setDeleting] = useState<string | null>(null)
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null)

  useEffect(() => {
    fetchWorks()
  }, [])

  const fetchWorks = async () => {
    try {
      const response = await fetch("/api/portfolio")
      if (!response.ok) {
        throw new Error("Failed to fetch works")
      }
      const data = await response.json()
      setWorks(data)
    } catch (error) {
      console.error("Error fetching works:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    setDeleting(id)
    try {
      const response = await fetch(`/api/portfolio/${id}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        throw new Error("Failed to delete work")
      }

      setWorks(works.filter((w) => w._id !== id))
      setDeleteConfirm(null)
    } catch (error) {
      console.error("Error deleting work:", error)
    } finally {
      setDeleting(null)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <LoadingSpinner />
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Portfolio Works</h1>
          <p className="text-muted-foreground mt-1">Manage your portfolio projects</p>
        </div>
        <Link href="/dashboard/works/new">
          <Button>Add New Work</Button>
        </Link>
      </div>

      {works.length === 0 ? (
        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <p className="text-muted-foreground mb-4">No portfolio works yet</p>
            <Link href="/dashboard/works/new">
              <Button>Create Your First Work</Button>
            </Link>
          </CardContent>
        </Card>
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
        description="Are you sure you want to delete this portfolio work? This action cannot be undone."
        onConfirm={() => deleteConfirm && handleDelete(deleteConfirm)}
        onCancel={() => setDeleteConfirm(null)}
        isLoading={!!deleting}
      />
    </div>
  )
}
