import { NextRequest, NextResponse } from "next/server"
import { verifyAuth } from "@/lib/auth"
import { connectDB } from "@/lib/mongodb"
import { PortfolioWork } from "@/models/Work"

export async function GET(request: NextRequest) {
  try {

    await connectDB()
    const works = await PortfolioWork.find().sort({ createdAt: -1 })

    return NextResponse.json(works)
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const auth = verifyAuth(request)
    if (!auth) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { title, mediaUrl, category, type, featured } = await request.json();
    if (!title || !mediaUrl || !category || !type) {
      return NextResponse.json({ error: "Missing required files!"}, { status: 400 })
    }

    const thumbnail = mediaUrl.replace(/\.(mp4|mov|webm)$/i, ".jpg")

    await connectDB()
    const newWork = await PortfolioWork.create({ title, mediaUrl, thumbnail, category, type, featured })

    return NextResponse.json(newWork, { status: 201 })
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
