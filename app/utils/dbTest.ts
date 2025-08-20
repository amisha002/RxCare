// utils/dbTest.ts
import { prisma } from "@/lib/prisma";

export async function testDbConnection() {
  try {
    // A simple query to check if DB is reachable
    const result = await prisma.$queryRaw`SELECT 1 as result`;
    console.log("✅ Database connection successful:", result);
    return true;
  } catch (error) {
    console.error("❌ Database connection failed:", error);
    return false;
  }
}
