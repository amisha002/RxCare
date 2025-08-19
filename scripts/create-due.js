const { PrismaClient } = require("../lib/generated/prisma");

async function main() {
  const prisma = new PrismaClient();
  try {
    // Upsert a user
    const user = await prisma.user.upsert({
      where: { email: "john.doe@example.com" },
      update: {},
      create: {
        email: "john.doe@example.com",
        password: "test123456",
        age: 30,
        phone_number: "+911234567890",
        caregiver_phone: "+911234567891",
        family_members: JSON.stringify(["Self"]),
      },
    });

    // Create a prescription if none exists
    let prescription = await prisma.prescription.findFirst({ where: { userId: user.id } });
    if (!prescription) {
      prescription = await prisma.prescription.create({
        data: {
          userId: user.id,
          family_member_name: "Self",
          prescription_image: null,
        },
      });
    }

    // Create a medicine if none exists
    let medicine = await prisma.medicine.findFirst({ where: { prescriptionId: prescription.id } });
    if (!medicine) {
      medicine = await prisma.medicine.create({
        data: {
          prescriptionId: prescription.id,
          medicine_name: "TestMedicine",
          dosage_count: 1,
          timing: JSON.stringify(["*on-demand*"]),
          duration_days: 1,
          start_date: new Date(),
          end_date: new Date(),
        },
      });
    }

    // Create a due notification (scheduled 2 minutes ago)
    const scheduled = new Date(Date.now() - 2 * 60 * 1000);
    const notification = await prisma.notification.create({
      data: {
        userId: user.id,
        medicineId: medicine.id,
        scheduled_time: scheduled,
      },
    });

    console.log("Created due notification:", notification.id);
  } finally {
    await prisma.$disconnect();
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});


