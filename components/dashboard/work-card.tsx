"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

interface WorkCardProps {
  work: {
    _id: string
    title: string
    thumbnail: string
    category: string
    type: "image" | "video"
    featured: boolean
  }
  onEdit: () => void
  onDelete: () => void
}

export function WorkCard({ work, onEdit, onDelete }: WorkCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative aspect-square overflow-hidden bg-muted">
        <img
          src={work.thumbnail || "/placeholder.svg"}
          alt={work.title}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        {work.featured && <Badge className="absolute top-2 right-2">Featured</Badge>}
        {work.type === "video" && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/40">
            <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center backdrop-blur">
              <span className="text-white text-xl">▶</span>
            </div>
          </div>
        )}
      </div>

      <div className="p-4 space-y-3">
        <div>
          <h3 className="font-semibold line-clamp-2">{work.title}</h3>
          <p className="text-sm text-muted-foreground capitalize">{work.category}</p>
        </div>

        <div className="flex gap-2">
          <Button size="sm" variant="outline" className="flex-1 bg-transparent" onClick={onEdit}>
            Edit
          </Button>
          <Button size="sm" variant="destructive" className="flex-1" onClick={onDelete}>
            Delete
          </Button>
        </div>
      </div>
    </Card>
  )
}
