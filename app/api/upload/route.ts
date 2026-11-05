import { type NextRequest, NextResponse } from "next/server"
import { verifyAuth } from "@/lib/auth"

const MAX_FILE_SIZE = 50 * 1024 * 1024 // 50MB
const CLOUDINARY_CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME

export async function POST(request: NextRequest) {
  try {
    const auth = await verifyAuth(request)
    if (!auth) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    if (!CLOUDINARY_CLOUD_NAME) {
      console.error("Cloudinary cloud name is not configured")
      return NextResponse.json({ error: "Cloudinary not configured" }, { status: 500 })
    }

    const formData = await request.formData()
    const file = formData.get("file")
    const folder = (formData.get("folder") as string) || "portfolio"

    if (!file || !(file instanceof File)) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 })
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: `File size exceeds the 50MB limit (File size: ${(file.size / (1024 * 1024)).toFixed(2)}MB)` },
        { status: 400 }
      )
    }

    const isImage = file.type.startsWith("image/")
    const isVideo = file.type.startsWith("video/")
    if (!isImage && !isVideo) {
      return NextResponse.json(
        { error: "Invalid file type. Only image (image/*) and video (video/*) files are permitted." },
        { status: 400 }
      )
    }

    const uploadFormData = new FormData()
    uploadFormData.append("file", file)
    uploadFormData.append("upload_preset", process.env.CLOUDINARY_UPLOAD_PRESET || "portfolio")
    uploadFormData.append("folder", folder)

    const response = await fetch(`https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/auto/upload`, {
      method: "POST",
      body: uploadFormData,
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error("Cloudinary upload failed:", errorText)
      return NextResponse.json({ error: "Cloudinary upload failed" }, { status: 502 })
    }

    const data = await response.json()

    return NextResponse.json({
      url: data.secure_url,
      resourceType: data.resource_type,
    })
  } catch (error) {
    console.error("Upload error:", error)
    return NextResponse.json({ error: "Upload failed" }, { status: 500 })
  }
}
