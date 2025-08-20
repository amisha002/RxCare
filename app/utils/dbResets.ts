// utils/dbReset.ts
import { prisma } from "@/lib/prisma";

export async function resetDatabase() {
  try {
    // Order matters: delete child tables first
    await prisma.notification.deleteMany();
    await prisma.medicine.deleteMany();
    await prisma.prescription.deleteMany();
    await prisma.user.deleteMany();

    console.log("🗑️ All data deleted. Fresh start ready.");
  } catch (error) {
    console.error("❌ Failed to reset database:", error);
  }
}
