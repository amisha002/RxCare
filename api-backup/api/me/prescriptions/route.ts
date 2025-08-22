import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { prisma } from "@/lib/prisma"
import { verifyAccessToken } from "@/lib/jwt"

export async function GET() {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get("accessToken")?.value
    if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

    let userId: number
    try {
      const decoded = verifyAccessToken(token) as any
      userId = typeof decoded.sub === "string" ? parseInt(decoded.sub, 10) : decoded.sub
    } catch {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 })
    }

    const prescriptions = await prisma.prescription.findMany({
      where: { userId },
      include: { medicines: true },
    })

    return NextResponse.json({ prescriptions })
  } catch (err) {
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}


