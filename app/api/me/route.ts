import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { prisma } from "@/lib/prisma"
import { verifyAccessToken } from "@/lib/jwt"

export async function GET() {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get("accessToken")?.value
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    let payload: { sub: number } | null = null
    try {
      const decoded = verifyAccessToken(token) as any
      payload = { sub: typeof decoded.sub === "string" ? parseInt(decoded.sub, 10) : decoded.sub }
    } catch {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 })
    }

    const user = await prisma.user.findUnique({
      where: { id: payload!.sub },
      select: { id: true, email: true, phone_number: true, age: true },
    })

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    return NextResponse.json({ user })
  } catch (err) {
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}


