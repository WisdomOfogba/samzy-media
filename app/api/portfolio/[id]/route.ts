import { type NextRequest, NextResponse } from "next/server"
import { verifyAuth } from "@/lib/auth"
import { connectDB } from "@/lib/mongodb"
import { PortfolioWork } from "@/models/Work"

type Params = { params: Promise<{ id: string }> }

/**
 * GET /api/portfolio/[id]
 */
export async function GET(request: NextRequest, { params }: Params) {
  try {
    const auth = verifyAuth(request)
    if (!auth) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

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
    const auth = verifyAuth(request)
    if (!auth) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    await connectDB()

    const { id } = await params

    const updatedWork = await PortfolioWork.findByIdAndUpdate(
      id,
      body,
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
    const auth = verifyAuth(request)
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
