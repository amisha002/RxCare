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
    
    // Get first available user and medicine (for testing)
    // Select only columns that exist in the current database to avoid P2022
    const user = await prisma.user.findFirst({
      select: {
        id: true,
        email: true,
      }
    });
    const medicine = await prisma.medicine.findFirst();
    
    if (!user || !medicine) {
      console.log('❌ No users or medicines found in database');
      console.log('Please create a user and medicine first');
      return;
    }
    
    console.log('👤 Using user:', user.name || user.email || user.id);
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
    
  } catch (error) {
    console.error('❌ Error creating test notification:', error);
  } finally {
    await prisma.$disconnect();
  }
}

createTestNotification();
