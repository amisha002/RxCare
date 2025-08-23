import { PrismaClient } from "../lib/generated/prisma";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // 1. Create a User
  const user = await prisma.user.create({
    data: {
      email: "john.doe@example.com",
      phone_number: "+919876543210",
      caregiver_phone: "+918888888888",
      family_members: JSON.stringify(["Father", "Mother"]),
      password: "test123456",
      age: 25
    },
  });

  // 2. Create multiple Prescriptions for the user
  const prescription1 = await prisma.prescription.create({
    data: {
      userId: user.id,
      family_member_name: "Father",
      prescription_image: "https://example.com/prescription-father.png",
    },
  });

  const prescription2 = await prisma.prescription.create({
    data: {
      userId: user.id,
      family_member_name: "Mother",
      prescription_image: "https://example.com/prescription-mother.png",
    },
  });

  const prescription3 = await prisma.prescription.create({
    data: {
      userId: user.id,
      family_member_name: "Self",
      prescription_image: "https://example.com/prescription-self.png",
    },
  });

  // 3. Add Medicines under prescriptions
  const medicine1 = await prisma.medicine.create({
    data: {
      prescriptionId: prescription1.id,
      medicine_name: "Lisinopril",
      dosage_count: 1,
      timing: JSON.stringify(["08:00"]), // once daily
      duration_days: 30,
      start_date: new Date(),
      end_date: new Date(new Date().setDate(new Date().getDate() + 30)),
    },
  });

  const medicine2 = await prisma.medicine.create({
    data: {
      prescriptionId: prescription1.id,
      medicine_name: "Atorvastatin",
      dosage_count: 1,
      timing: JSON.stringify(["20:00"]), // once daily at night
      duration_days: 30,
      start_date: new Date(),
      end_date: new Date(new Date().setDate(new Date().getDate() + 30)),
    },
  });

  const medicine3 = await prisma.medicine.create({
    data: {
      prescriptionId: prescription2.id,
      medicine_name: "Metformin",
      dosage_count: 2,
      timing: JSON.stringify(["08:00", "20:00"]), // twice daily
      duration_days: 60,
      start_date: new Date(),
      end_date: new Date(new Date().setDate(new Date().getDate() + 60)),
    },
  });

  const medicine4 = await prisma.medicine.create({
    data: {
      prescriptionId: prescription2.id,
      medicine_name: "Amoxicillin",
      dosage_count: 2,
      timing: JSON.stringify(["09:00", "21:00"]), // twice daily
      duration_days: 7,
      start_date: new Date(),
      end_date: new Date(new Date().setDate(new Date().getDate() + 7)),
    },
  });

  const medicine5 = await prisma.medicine.create({
    data: {
      prescriptionId: prescription3.id,
      medicine_name: "Ibuprofen",
      dosage_count: 1,
      timing: JSON.stringify(["As needed"]), // as needed
      duration_days: 90,
      start_date: new Date(),
      end_date: new Date(new Date().setDate(new Date().getDate() + 90)),
    },
  });

  const medicine6 = await prisma.medicine.create({
    data: {
      prescriptionId: prescription3.id,
      medicine_name: "Ventolin HFA",
      dosage_count: 2,
      timing: JSON.stringify(["As needed"]), // as needed
      duration_days: 120,
      start_date: new Date(),
      end_date: new Date(new Date().setDate(new Date().getDate() + 120)),
    },
  });

  // 4. Add Notifications for upcoming doses
  await prisma.notification.createMany({
    data: [
      {
        userId: user.id,
        medicineId: medicine1.id,
        scheduled_time: new Date(new Date().setHours(8, 0, 0, 0)), // today 8 AM
      },
      {
        userId: user.id,
        medicineId: medicine2.id,
        scheduled_time: new Date(new Date().setHours(20, 0, 0, 0)), // today 8 PM
      },
      {
        userId: user.id,
        medicineId: medicine3.id,
        scheduled_time: new Date(new Date().setHours(8, 0, 0, 0)), // today 8 AM
      },
      {
        userId: user.id,
        medicineId: medicine3.id,
        scheduled_time: new Date(new Date().setHours(20, 0, 0, 0)), // today 8 PM
      },
      {
        userId: user.id,
        medicineId: medicine4.id,
        scheduled_time: new Date(new Date().setHours(9, 0, 0, 0)), // today 9 AM
      },
      {
        userId: user.id,
        medicineId: medicine4.id,
        scheduled_time: new Date(new Date().setHours(21, 0, 0, 0)), // today 9 PM
      },
    ],
  });

  console.log("✅ Seeding completed!");
}

main()
  .catch((e) => {
    console.error("❌ Error seeding database:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
