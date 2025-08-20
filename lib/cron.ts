import cron from "node-cron";
import { prisma } from "./prisma";

export function startCron() {
  cron.schedule("* * * * *", async () => {
    const now = new Date();

    const due = await prisma.notification.findMany({
      where: {
        scheduled_time: { lte: now },
        sent: false,
      },
      include: { medicine: true, user: true },
    });

    for (const n of due) {
      console.log(`⏰ Alarm for ${n.medicine.medicine_name}`);

      await prisma.notification.update({
        where: { id: n.id },
        data: { sent: true },
      });
    }
  });
}
