import { type NextRequest, NextResponse } from "next/server"

const CLOUDINARY_URL = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME

export async function POST(request: NextRequest) {
  try {
    if (!CLOUDINARY_URL) {
      return NextResponse.json({ error: "Cloudinary not configured" }, { status: 500 })
    }

    const formData = await request.formData()
    const file = formData.get("file") as File
    const folder = formData.get("folder") as string

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 })
    }

    const uploadFormData = new FormData()
    uploadFormData.append("file", file)
    uploadFormData.append("upload_preset", process.env.CLOUDINARY_UPLOAD_PRESET || "portfolio")
    uploadFormData.append("folder", folder)

    const response = await fetch(`https://api.cloudinary.com/v1_1/${CLOUDINARY_URL}/auto/upload`, {
      method: "POST",
      body: uploadFormData,
    })

    if (!response.ok) {
      throw new Error("Cloudinary upload failed")
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
