import { cookies } from "next/headers"
import { type NextRequest, NextResponse } from "next/server"

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "admin@example.com"
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin123"

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 })
    }

    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      const sessionToken = crypto.randomUUID() 
      const cookieStore = await cookies()
      cookieStore.set("auth-token", sessionToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 7, // 7 days
      })

      return NextResponse.json({ success: true })
    }

    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
