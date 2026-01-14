"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { LoadingSpinner } from "./loading-spinner"

interface CloudinaryUploadProps {
  folder: "Animations" | "Birthday Designs" | "Graphics Design" | "Logo Montage" | "Motion Graphics"
  accept: string
  onUpload: (url: string) => void
  currentUrl?: string
  disabled?: boolean
}

export function CloudinaryUpload({ folder, accept, onUpload, currentUrl, disabled }: CloudinaryUploadProps) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setLoading(true)
    setError("")

    try {
      const formData = new FormData()
      formData.append("file", file)
      formData.append("folder", `smp/${folder}`)

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        throw new Error("Upload failed")
      }

      const data = await response.json()
      onUpload(data.url)
    } catch (err) {
      setError("Failed to upload file. Please try again.")
    } finally {
      setLoading(false)
      if (fileInputRef.current) {
        fileInputRef.current.value = ""
      }
    }
  }

  return (
    <div className="space-y-3">
      <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
        {loading ? (
          <div className="flex justify-center">
            <LoadingSpinner />
          </div>
        ) : currentUrl ? (
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground">Current upload:</p>
            <p className="text-xs text-muted-foreground break-all">{currentUrl}</p>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => fileInputRef.current?.click()}
              disabled={disabled}
            >
              Replace File
            </Button>
          </div>
        ) : (
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Click to upload or drag and drop</p>
            <p className="text-xs text-muted-foreground">Files up to 100MB</p>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => fileInputRef.current?.click()}
              disabled={disabled}
            >
              Choose File
            </Button>
          </div>
        )}
      </div>

      {error && <p className="text-sm text-destructive">{error}</p>}

      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        onChange={handleFileSelect}
        className="hidden"
        disabled={disabled || loading}
      />
    </div>
  )
}
