import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const now = new Date();

  // Fetch notifications scheduled before now and not sent
  const dueNotifications = await prisma.notification.findMany({
    where: {
      scheduled_time: { lte: now },
      sent: false,
    },
    include: {
      medicine: true,
      user: true,
    },
  });

  return NextResponse.json(dueNotifications);
}
