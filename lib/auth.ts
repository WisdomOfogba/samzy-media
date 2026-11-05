import { cookies } from "next/headers"
import type { NextRequest } from "next/server"
import { SignJWT, jwtVerify } from "jose"

const AUTH_COOKIE_NAME = "auth-token"

function getJwtSecret(): Uint8Array | null {
  const secret = process.env.AUTH_SECRET
  if (!secret) {
    console.error("AUTH_SECRET is not configured in environment variables.")
    return null
  }
  return new TextEncoder().encode(secret)
}

export async function signAuthToken(payload: { email: string }): Promise<string> {
  const secretKey = getJwtSecret()
  if (!secretKey) {
    throw new Error("AUTH_SECRET is not configured.")
  }

  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(secretKey)
}

export async function verifyAuthToken(token: string): Promise<boolean> {
  try {
    const secretKey = getJwtSecret()
    if (!secretKey) return false

    const { payload } = await jwtVerify(token, secretKey)
    return !!payload
  } catch {
    return false
  }
}

export async function verifyAuth(request: NextRequest): Promise<boolean> {
  try {
    let token = request.cookies.get(AUTH_COOKIE_NAME)?.value

    if (!token) {
      const cookieHeader = request.headers.get("cookie")
      if (cookieHeader) {
        const cookiesList = cookieHeader.split(";").map((c) => c.trim())
        const target = cookiesList.find((c) => c.startsWith(`${AUTH_COOKIE_NAME}=`))
        if (target) {
          token = target.substring(AUTH_COOKIE_NAME.length + 1)
        }
      }
    }

    if (!token) return false

    return await verifyAuthToken(token)
  } catch {
    return false
  }
}

export async function getAuthToken(): Promise<string | undefined> {
  const cookieStore = await cookies()
  return cookieStore.get(AUTH_COOKIE_NAME)?.value
}
