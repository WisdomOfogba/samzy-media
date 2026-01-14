import { cookies } from "next/headers"
import type { NextRequest } from "next/server"

export function verifyAuth(request: NextRequest): boolean {
  const cookieHeader = request.headers.get("cookie")

  if (!cookieHeader) return false

  const cookies = cookieHeader.split(";").map((c) => c.trim())
  const authToken = cookies.find((c) => c.startsWith("auth-token="))

  return !!authToken
}

export async function getAuthToken() {
  const cookieStore = await cookies()
  return cookieStore.get("auth-token")?.value
}
