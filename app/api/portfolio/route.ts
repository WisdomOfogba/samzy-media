import { NextRequest, NextResponse } from "next/server"
import { verifyAuth } from "@/lib/auth"
import { connectDB } from "@/lib/mongodb"
import { PortfolioWork } from "@/models/Work"
import { workValidationSchema } from "@/lib/validations"

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
    const auth = await verifyAuth(request)
    if (!auth) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const validation = workValidationSchema.safeParse(body)

    if (!validation.success) {
      return NextResponse.json(
        { error: "Validation failed", details: validation.error.flatten().fieldErrors },
        { status: 400 }
      )
    }

    const validatedData = validation.data
    const thumbnail =
      validatedData.thumbnail ||
      validatedData.mediaUrl.replace(/\.(mp4|mov|webm)$/i, ".jpg")

    await connectDB()
    const newWork = await PortfolioWork.create({
      ...validatedData,
      thumbnail,
    })

    return NextResponse.json(newWork, { status: 201 })
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
