import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// CREATE a new notification (POST /api/notifications)
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { userId, medicineId, scheduled_time } = body;

    if (!userId || !medicineId || !scheduled_time) {
      return NextResponse.json(
        { error: "userId, medicineId, and scheduled_time are required" },
        { status: 400 }
      );
    }

    const newNotification = await prisma.notification.create({
      data: {
        userId,
        medicineId,
        scheduled_time: new Date(scheduled_time), // ensure Date type
      },
    });

    return NextResponse.json(newNotification, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// GET all notifications (GET /api/notifications)
export async function GET() {
  try {
    const notifications = await prisma.notification.findMany({
      include: {
        user: true,      // fetch related user
        medicine: true,  // fetch related medicine
      },
    });

    return NextResponse.json(notifications, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
