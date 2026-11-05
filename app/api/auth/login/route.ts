import { cookies } from "next/headers"
import { type NextRequest, NextResponse } from "next/server"
import { signAuthToken } from "@/lib/auth"

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 })
    }

    const adminEmail = process.env.ADMIN_EMAIL
    const adminPassword = process.env.ADMIN_PASSWORD
    const authSecret = process.env.AUTH_SECRET

    if (!adminEmail || !adminPassword || !authSecret) {
      console.error("Missing required authentication environment variables (ADMIN_EMAIL, ADMIN_PASSWORD, or AUTH_SECRET).")
      return NextResponse.json(
        { error: "Authentication service is not properly configured on the server." },
        { status: 500 }
      )
    }

    if (email === adminEmail && password === adminPassword) {
      const sessionToken = await signAuthToken({ email })
      const cookieStore = await cookies()
      cookieStore.set("auth-token", sessionToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 7, // 7 days
        path: "/",
      })

      return NextResponse.json({ success: true })
    }

    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
