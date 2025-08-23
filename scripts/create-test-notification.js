require('dotenv').config();
const { PrismaClient } = require('../lib/generated/prisma');

const prisma = new PrismaClient();

async function createTestNotification() {
  try {
    // Get current time and add 3 minutes
    const now = new Date();
    const scheduledTime = new Date(now.getTime() + 3 * 60 * 1000); // 3 minutes from now
    
    console.log('🕐 Current time:', now.toLocaleString());
    console.log('⏰ Scheduled time:', scheduledTime.toLocaleString());
    
    // Find the specific user by email
    const user = await prisma.user.findUnique({
      where: {
        email: 'shubhradeeproy343@gmail.com'
      },
      select: {
        id: true,
        email: true,
      }
    });
    
    const medicine = await prisma.medicine.findFirst();
    
    if (!user) {
      console.log('❌ User with email shubhradeeproy343@gmail.com not found in database');
      console.log('Please create this user first or check the email address');
      return;
    }
    
    if (!medicine) {
      console.log('❌ No medicines found in database');
      console.log('Please create a medicine first');
      return;
    }
    
    console.log('👤 Using user:', user.email);
    console.log('💊 Using medicine:', medicine.medicine_name || medicine.id);
    
    // Create the test notification
    const notification = await prisma.notification.create({
      data: {
        userId: user.id,
        medicineId: medicine.id,
        scheduled_time: scheduledTime,
        sent: false,
      },
    });
    
    console.log('✅ Test notification created successfully!');
    console.log('📋 Notification ID:', notification.id);
    console.log('⏰ Will trigger at:', scheduledTime.toLocaleString());
    console.log('');
    console.log('🎯 What will happen:');
    console.log('1. Wait 3 minutes');
    console.log('2. You should get a push notification');
    console.log('3. The notification will appear even if /alarms page is closed!');
    console.log('4. Visit /alarms page to hear the alarm sound');
    
  } catch (error) {
    console.error('❌ Error creating test notification:', error);
  } finally {
    await prisma.$disconnect();
  }
}

createTestNotification();
