const { PrismaClient } = require('../lib/generated/prisma');

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding prescriptions database...");

  try {
    // Check if user already exists, if not create one
    let user = await prisma.user.findFirst({
      where: { email: "john.doe@example.com" }
    });

    if (!user) {
      user = await prisma.user.create({
        data: {
          email: "john.doe@example.com",
          phone_number: "+919876543210",
          caregiver_phone: "+918888888888",
          family_members: ["Father", "Mother", "Self"],
          password: "test123456",
          age: 25
        },
      });
      console.log("✅ User created:", user.id);
    } else {
      console.log("✅ User already exists:", user.id);
    }

    // Clear existing prescriptions and medicines for this user
    await prisma.notification.deleteMany({
      where: {
        user: { id: user.id }
      }
    });

    await prisma.medicine.deleteMany({
      where: {
        prescription: {
          userId: user.id
        }
      }
    });

    await prisma.prescription.deleteMany({
      where: { userId: user.id }
    });

    console.log("✅ Cleared existing data");

    // Create prescriptions with medicines
    const prescriptions = [
      {
        family_member_name: "Father",
        prescription_image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop",
        medicines: [
          {
            medicine_name: "Lisinopril",
            dosage_count: 1,
            timing: ["08:00"],
            duration_days: 30,
            start_date: new Date(),
            end_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
          },
          {
            medicine_name: "Atorvastatin",
            dosage_count: 1,
            timing: ["20:00"],
            duration_days: 30,
            start_date: new Date(),
            end_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
          },
          {
            medicine_name: "Aspirin",
            dosage_count: 1,
            timing: ["08:00"],
            duration_days: 90,
            start_date: new Date(),
            end_date: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000)
          }
        ]
      },
      {
        family_member_name: "Mother",
        prescription_image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&h=300&fit=crop",
        medicines: [
          {
            medicine_name: "Metformin",
            dosage_count: 2,
            timing: ["08:00", "20:00"],
            duration_days: 60,
            start_date: new Date(),
            end_date: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000)
          },
          {
            medicine_name: "Amoxicillin",
            dosage_count: 2,
            timing: ["09:00", "21:00"],
            duration_days: 7,
            start_date: new Date(),
            end_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
          },
          {
            medicine_name: "Omeprazole",
            dosage_count: 1,
            timing: ["08:00"],
            duration_days: 30,
            start_date: new Date(),
            end_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
          }
        ]
      },
      {
        family_member_name: "Self",
        prescription_image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=300&fit=crop",
        medicines: [
          {
            medicine_name: "Ibuprofen",
            dosage_count: 1,
            timing: ["As needed"],
            duration_days: 90,
            start_date: new Date(),
            end_date: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000)
          },
          {
            medicine_name: "Ventolin HFA",
            dosage_count: 2,
            timing: ["As needed"],
            duration_days: 120,
            start_date: new Date(),
            end_date: new Date(Date.now() + 120 * 24 * 60 * 60 * 1000)
          },
          {
            medicine_name: "Cetirizine",
            dosage_count: 1,
            timing: ["20:00"],
            duration_days: 30,
            start_date: new Date(),
            end_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
          }
        ]
      },
      {
        family_member_name: "Grandmother",
        prescription_image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop",
        medicines: [
          {
            medicine_name: "Warfarin",
            dosage_count: 1,
            timing: ["18:00"],
            duration_days: 90,
            start_date: new Date(),
            end_date: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000)
          },
          {
            medicine_name: "Calcium Carbonate",
            dosage_count: 2,
            timing: ["08:00", "20:00"],
            duration_days: 60,
            start_date: new Date(),
            end_date: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000)
          }
        ]
      }
    ];

    // Create prescriptions and medicines
    for (const prescriptionData of prescriptions) {
      const prescription = await prisma.prescription.create({
        data: {
          userId: user.id,
          family_member_name: prescriptionData.family_member_name,
          prescription_image: prescriptionData.prescription_image,
        },
      });

      console.log(`✅ Created prescription for ${prescriptionData.family_member_name}`);

      // Create medicines for this prescription
      for (const medicineData of prescriptionData.medicines) {
        const medicine = await prisma.medicine.create({
          data: {
            prescriptionId: prescription.id,
            medicine_name: medicineData.medicine_name,
            dosage_count: medicineData.dosage_count,
            timing: medicineData.timing,
            duration_days: medicineData.duration_days,
            start_date: medicineData.start_date,
            end_date: medicineData.end_date,
          },
        });

        // Create notifications for medicines that have specific timing
        if (medicineData.timing.length > 0 && medicineData.timing[0] !== "As needed") {
          for (const time of medicineData.timing) {
            const [hours, minutes] = time.split(':').map(Number);
            const scheduledTime = new Date();
            scheduledTime.setHours(hours, minutes, 0, 0);
            
            // If the time has passed today, schedule for tomorrow
            if (scheduledTime < new Date()) {
              scheduledTime.setDate(scheduledTime.getDate() + 1);
            }

            await prisma.notification.create({
              data: {
                userId: user.id,
                medicineId: medicine.id,
                scheduled_time: scheduledTime,
                sent: false,
              },
            });
          }
        }

        console.log(`  ✅ Added medicine: ${medicineData.medicine_name}`);
      }
    }

    // Get summary statistics
    const totalPrescriptions = await prisma.prescription.count({
      where: { userId: user.id }
    });

    const totalMedicines = await prisma.medicine.count({
      where: {
        prescription: { userId: user.id }
      }
    });

    const activeMedicines = await prisma.medicine.count({
      where: {
        prescription: { userId: user.id },
        end_date: { gte: new Date() }
      }
    });

    const dueForRefill = await prisma.medicine.count({
      where: {
        prescription: { userId: user.id },
        end_date: {
          gte: new Date(),
          lte: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
        }
      }
    });

    console.log("\n📊 Database Summary:");
    console.log(`Total Prescriptions: ${totalPrescriptions}`);
    console.log(`Total Medicines: ${totalMedicines}`);
    console.log(`Active Medicines: ${activeMedicines}`);
    console.log(`Due for Refill (within 7 days): ${dueForRefill}`);

    console.log("\n✅ Prescriptions seeding completed successfully!");
    console.log("\n🎯 Sample Data Created:");
    console.log("- 4 Family Members (Father, Mother, Self, Grandmother)");
    console.log("- 11 Different Medicines");
    console.log("- Various medication schedules (daily, twice daily, as needed)");
    console.log("- Realistic end dates and refill schedules");

  } catch (error) {
    console.error("❌ Error seeding prescriptions:", error);
    throw error;
  }
}

main()
  .catch((e) => {
    console.error("❌ Error in main:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
