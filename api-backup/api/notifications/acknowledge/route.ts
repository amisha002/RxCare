import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { id, action } = body;

    if (!id || !action) {
      return NextResponse.json(
        { error: "id and action are required" },
        { status: 400 }
      );
    }

    // Update notification as sent
    await prisma.notification.update({
      where: { id: parseInt(id) },
      data: { sent: true },
    });

    // If snoozed, create a new notification for 5 minutes later
    if (action === "snooze") {
      const notification = await prisma.notification.findUnique({
        where: { id: parseInt(id) },
        include: { medicine: true },
      });

      if (notification) {
        const snoozeTime = new Date();
        snoozeTime.setMinutes(snoozeTime.getMinutes() + 5);

        await prisma.notification.create({
          data: {
            userId: notification.userId,
            medicineId: notification.medicineId,
            scheduled_time: snoozeTime,
          },
        });
      }
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
