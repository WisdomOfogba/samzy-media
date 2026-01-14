"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

interface ConfirmDialogProps {
  isOpen: boolean
  title: string
  description: string
  onConfirm: () => void
  onCancel: () => void
  isLoading?: boolean
}

export function ConfirmDialog({ isOpen, title, description, onConfirm, onCancel, isLoading }: ConfirmDialogProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <Card className="w-full max-w-sm mx-4">
        <div className="p-6 space-y-4">
          <h2 className="text-lg font-semibold">{title}</h2>
          <p className="text-muted-foreground">{description}</p>
          <div className="flex gap-3 justify-end">
            <Button variant="outline" onClick={onCancel} disabled={isLoading}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={onConfirm} disabled={isLoading}>
              {isLoading ? "Deleting..." : "Delete"}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}
