import { type NextRequest, NextResponse } from "next/server"
import { verifyAuth } from "@/lib/auth"
import { connectDB } from "@/lib/mongodb"
import { PortfolioWork } from "@/models/Work"
import { workValidationSchema } from "@/lib/validations"

type Params = { params: Promise<{ id: string }> }

/**
 * GET /api/portfolio/[id]
 */
export async function GET(request: NextRequest, { params }: Params) {
  try {
    await connectDB()
    const { id } = await params

    const work = await PortfolioWork.findById(id)

    if (!work) {
      return NextResponse.json({ error: "Work not found" }, { status: 404 })
    }

    return NextResponse.json(work)
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

/**
 * PUT /api/portfolio/[id]
 */
export async function PUT(request: NextRequest, { params }: Params) {
  try {
    const auth = await verifyAuth(request)
    if (!auth) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { _id, __v, createdAt, updatedAt, ...payload } = body

    const validation = workValidationSchema.partial().safeParse(payload)
    if (!validation.success) {
      return NextResponse.json(
        { error: "Validation failed", details: validation.error.flatten().fieldErrors },
        { status: 400 }
      )
    }

    const sanitizedData = validation.data
    if (sanitizedData.mediaUrl && !sanitizedData.thumbnail) {
      sanitizedData.thumbnail = sanitizedData.mediaUrl.replace(/\.(mp4|mov|webm)$/i, ".jpg")
    }

    await connectDB()
    const { id } = await params

    const updatedWork = await PortfolioWork.findByIdAndUpdate(
      id,
      sanitizedData,
      {
        new: true,         // return updated doc
        runValidators: true,
      }
    )

    if (!updatedWork) {
      return NextResponse.json({ error: "Work not found" }, { status: 404 })
    }

    return NextResponse.json(updatedWork)
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

/**
 * DELETE /api/portfolio/[id]
 */
export async function DELETE(request: NextRequest, { params }: Params) {
  try {
    const auth = await verifyAuth(request)
    if (!auth) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    await connectDB()
    const { id } = await params
    const deletedWork = await PortfolioWork.findByIdAndDelete(id)

    if (!deletedWork) {
      return NextResponse.json({ error: "Work not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
