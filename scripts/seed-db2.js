const { PrismaClient } = require('../lib/generated/prisma');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seeding...');

  // Clear existing data (optional - comment out if you want to keep existing data)


  // Create Users
  console.log('👥 Creating users...');
  const users = await Promise.all([
    prisma.user.create({
      data: {
        email: 'john.doe@example.com',
        password: await bcrypt.hash('password123', 10),
        age: 65,
        phone_number: '+1234567890',
        caregiver_phone: '+1987654321',
        caregiver_phone_verified: true,
        family_members: JSON.stringify([
          { name: 'Sarah Doe', relation: 'Daughter' },
          { name: 'Mike Doe', relation: 'Son' }
        ])
      }
    }),
    prisma.user.create({
      data: {
        email: 'mary.smith@example.com',
        password: await bcrypt.hash('password123', 10),
        age: 72,
        phone_number: '+1234567891',
        caregiver_phone: '+1987654322',
        caregiver_phone_verified: false,
        family_members: JSON.stringify([
          { name: 'David Smith', relation: 'Son' },
          { name: 'Lisa Johnson', relation: 'Daughter' }
        ])
      }
    }),
    prisma.user.create({
      data: {
        email: 'robert.wilson@example.com',
        password: await bcrypt.hash('password123', 10),
        age: 58,
        phone_number: '+1234567892',
        family_members: JSON.stringify([
          { name: 'Emma Wilson', relation: 'Wife' },
          { name: 'James Wilson', relation: 'Son' }
        ])
      }
    }),
    prisma.user.create({
      data: {
        email: 'elizabeth.brown@example.com',
        password: await bcrypt.hash('password123', 10),
        age: 68,
        phone_number: '+1234567893',
        caregiver_phone: '+1987654323',
        caregiver_phone_verified: true,
        family_members: JSON.stringify([
          { name: 'Thomas Brown', relation: 'Husband' },
          { name: 'Jennifer Brown', relation: 'Daughter' }
        ])
      }
    }),
    prisma.user.create({
      data: {
        email: 'william.davis@example.com',
        password: await bcrypt.hash('password123', 10),
        age: 75,
        phone_number: '+1234567894',
        family_members: JSON.stringify([
          { name: 'Patricia Davis', relation: 'Wife' }
        ])
      }
    })
  ]);

  console.log(`✅ Created ${users.length} users`);

  // Create Prescriptions
  console.log('💊 Creating prescriptions...');
  const prescriptions = await Promise.all([
    // John Doe's prescriptions
    prisma.prescription.create({
      data: {
        userId: users[0].id,
        family_member_name: 'John Doe',
        prescription_image: 'prescription-john-heart.jpg'
      }
    }),
    prisma.prescription.create({
      data: {
        userId: users[0].id,
        family_member_name: 'John Doe',
        prescription_image: 'prescription-john-diabetes.jpg'
      }
    }),
    
    // Mary Smith's prescriptions
    prisma.prescription.create({
      data: {
        userId: users[1].id,
        family_member_name: 'Mary Smith',
        prescription_image: 'prescription-mary-blood-pressure.jpg'
      }
    }),
    
    // Robert Wilson's prescriptions
    prisma.prescription.create({
      data: {
        userId: users[2].id,
        family_member_name: 'Robert Wilson',
        prescription_image: 'prescription-robert-cholesterol.jpg'
      }
    }),
    prisma.prescription.create({
      data: {
        userId: users[2].id,
        family_member_name: 'Robert Wilson',
        prescription_image: 'prescription-robert-vitamins.jpg'
      }
    }),
    
    // Elizabeth Brown's prescriptions
    prisma.prescription.create({
      data: {
        userId: users[3].id,
        family_member_name: 'Elizabeth Brown',
        prescription_image: 'prescription-elizabeth-thyroid.jpg'
      }
    }),
    
    // William Davis's prescriptions
    prisma.prescription.create({
      data: {
        userId: users[4].id,
        family_member_name: 'William Davis',
        prescription_image: 'prescription-william-pain.jpg'
      }
    })
  ]);

  console.log(`✅ Created ${prescriptions.length} prescriptions`);

  // Create Medicines
  console.log('💊 Creating medicines...');
  const medicines = await Promise.all([
    // John Doe's medicines
    prisma.medicine.create({
      data: {
        prescriptionId: prescriptions[0].id,
        medicine_name: 'Lisinopril',
        dosage_count: 1,
        timing: JSON.stringify({
          times: ['08:00'],
          days: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']
        }),
        duration_days: 30,
        start_date: new Date('2024-01-01'),
        end_date: new Date('2024-01-31')
      }
    }),
    prisma.medicine.create({
      data: {
        prescriptionId: prescriptions[1].id,
        medicine_name: 'Metformin',
        dosage_count: 2,
        timing: JSON.stringify({
          times: ['08:00', '20:00'],
          days: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']
        }),
        duration_days: 30,
        start_date: new Date('2024-01-01'),
        end_date: new Date('2024-01-31')
      }
    }),
    
    // Mary Smith's medicines
    prisma.medicine.create({
      data: {
        prescriptionId: prescriptions[2].id,
        medicine_name: 'Amlodipine',
        dosage_count: 1,
        timing: JSON.stringify({
          times: ['09:00'],
          days: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']
        }),
        duration_days: 30,
        start_date: new Date('2024-01-01'),
        end_date: new Date('2024-01-31')
      }
    }),
    prisma.medicine.create({
      data: {
        prescriptionId: prescriptions[2].id,
        medicine_name: 'Hydrochlorothiazide',
        dosage_count: 1,
        timing: JSON.stringify({
          times: ['09:00'],
          days: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']
        }),
        duration_days: 30,
        start_date: new Date('2024-01-01'),
        end_date: new Date('2024-01-31')
      }
    }),
    
    // Robert Wilson's medicines
    prisma.medicine.create({
      data: {
        prescriptionId: prescriptions[3].id,
        medicine_name: 'Atorvastatin',
        dosage_count: 1,
        timing: JSON.stringify({
          times: ['20:00'],
          days: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']
        }),
        duration_days: 30,
        start_date: new Date('2024-01-01'),
        end_date: new Date('2024-01-31')
      }
    }),
    prisma.medicine.create({
      data: {
        prescriptionId: prescriptions[4].id,
        medicine_name: 'Vitamin D3',
        dosage_count: 1,
        timing: JSON.stringify({
          times: ['08:00'],
          days: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']
        }),
        duration_days: 90,
        start_date: new Date('2024-01-01'),
        end_date: new Date('2024-03-31')
      }
    }),
    prisma.medicine.create({
      data: {
        prescriptionId: prescriptions[4].id,
        medicine_name: 'Omega-3',
        dosage_count: 2,
        timing: JSON.stringify({
          times: ['08:00', '20:00'],
          days: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']
        }),
        duration_days: 90,
        start_date: new Date('2024-01-01'),
        end_date: new Date('2024-03-31')
      }
    }),
    
    // Elizabeth Brown's medicines
    prisma.medicine.create({
      data: {
        prescriptionId: prescriptions[5].id,
        medicine_name: 'Levothyroxine',
        dosage_count: 1,
        timing: JSON.stringify({
          times: ['07:00'],
          days: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']
        }),
        duration_days: 30,
        start_date: new Date('2024-01-01'),
        end_date: new Date('2024-01-31')
      }
    }),
    
    // William Davis's medicines
    prisma.medicine.create({
      data: {
        prescriptionId: prescriptions[6].id,
        medicine_name: 'Ibuprofen',
        dosage_count: 2,
        timing: JSON.stringify({
          times: ['08:00', '20:00'],
          days: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']
        }),
        duration_days: 14,
        start_date: new Date('2024-01-01'),
        end_date: new Date('2024-01-15')
      }
    }),
    prisma.medicine.create({
      data: {
        prescriptionId: prescriptions[6].id,
        medicine_name: 'Acetaminophen',
        dosage_count: 3,
        timing: JSON.stringify({
          times: ['08:00', '14:00', '20:00'],
          days: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']
        }),
        duration_days: 7,
        start_date: new Date('2024-01-01'),
        end_date: new Date('2024-01-08')
      }
    })
  ]);

  console.log(`✅ Created ${medicines.length} medicines`);

  // Create some sample notifications for today
  console.log('🔔 Creating notifications...');
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const notifications = await Promise.all([
    // Today's notifications
    prisma.notification.create({
      data: {
        userId: users[0].id,
        medicineId: medicines[0].id,
        scheduled_time: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 8, 0, 0),
        sent: false
      }
    }),
    prisma.notification.create({
      data: {
        userId: users[0].id,
        medicineId: medicines[1].id,
        scheduled_time: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 8, 0, 0),
        sent: false
      }
    }),
    prisma.notification.create({
      data: {
        userId: users[1].id,
        medicineId: medicines[2].id,
        scheduled_time: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 9, 0, 0),
        sent: false
      }
    }),
    prisma.notification.create({
      data: {
        userId: users[2].id,
        medicineId: medicines[4].id,
        scheduled_time: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 8, 0, 0),
        sent: false
      }
    }),
    prisma.notification.create({
      data: {
        userId: users[3].id,
        medicineId: medicines[6].id,
        scheduled_time: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 7, 0, 0),
        sent: false
      }
    }),
    
    // Tomorrow's notifications
    prisma.notification.create({
      data: {
        userId: users[0].id,
        medicineId: medicines[0].id,
        scheduled_time: new Date(tomorrow.getFullYear(), tomorrow.getMonth(), tomorrow.getDate(), 8, 0, 0),
        sent: false
      }
    }),
    prisma.notification.create({
      data: {
        userId: users[0].id,
        medicineId: medicines[1].id,
        scheduled_time: new Date(tomorrow.getFullYear(), tomorrow.getMonth(), tomorrow.getDate(), 20, 0, 0),
        sent: false
      }
    })
  ]);

  console.log(`✅ Created ${notifications.length} notifications`);

  console.log('🎉 Database seeding completed successfully!');
  console.log('\n📊 Summary:');
  console.log(`   👥 Users: ${users.length}`);
  console.log(`   💊 Prescriptions: ${prescriptions.length}`);
  console.log(`   💊 Medicines: ${medicines.length}`);
  console.log(`   🔔 Notifications: ${notifications.length}`);
  
  console.log('\n🔑 Test Login Credentials:');
  users.forEach(user => {
    console.log(`   Email: ${user.email} | Password: password123`);
  });
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
