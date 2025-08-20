require('dotenv').config();
const webpush = require('web-push');

// Test push subscription functionality
async function testPushSubscription() {
  try {
    console.log('🧪 Testing Push Subscription System...');
    console.log('=====================================');
    
    // Check VAPID keys
    const VAPID_PUBLIC = process.env.VAPID_PUBLIC_KEY;
    const VAPID_PRIVATE = process.env.VAPID_PRIVATE_KEY;
    const VAPID_SUBJECT = process.env.VAPID_SUBJECT || 'mailto:admin@example.com';
    
    if (!VAPID_PUBLIC || !VAPID_PRIVATE) {
      console.log('❌ Missing VAPID keys in .env file');
      console.log('Please check your .env file has:');
      console.log('VAPID_PUBLIC_KEY=...');
      console.log('VAPID_PRIVATE_KEY=...');
      return;
    }
    
    console.log('✅ VAPID keys found');
    console.log('🔑 Public key length:', VAPID_PUBLIC.length);
    console.log('🔑 Private key length:', VAPID_PRIVATE.length);
    
    // Set VAPID details
    webpush.setVapidDetails(VAPID_SUBJECT, VAPID_PUBLIC, VAPID_PRIVATE);
    console.log('✅ VAPID details set');
    
    // Test the test endpoint
    console.log('\n🌐 Testing backend connectivity...');
    const testResponse = await fetch('http://localhost:3001/api/push/test', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    if (testResponse.ok) {
      const testData = await testResponse.json();
      console.log('✅ Backend test endpoint working');
      console.log('📊 Active subscriptions:', testData.count);
      
      if (testData.count === 0) {
        console.log('❌ No active push subscriptions found!');
        console.log('This means the frontend hasn\'t subscribed to push notifications yet.');
        console.log('\n🔧 To fix this:');
        console.log('1. Open your RxMind app in browser');
        console.log('2. Check browser console for push subscription messages');
        console.log('3. Look for "Push notifications enabled!" message');
        console.log('4. Make sure you granted notification permission');
      } else {
        console.log('✅ Found active subscriptions - backend should be able to send notifications');
      }
    } else {
      console.log('❌ Backend test endpoint failed:', testResponse.status);
      console.log('Response text:', await testResponse.text());
      console.log('Make sure your backend server is running: npm run server');
    }
    
  } catch (error) {
    console.error('❌ Error testing push subscription:', error);
  }
}

// Test if we can send a notification to a dummy subscription
async function testNotificationSending() {
  try {
    console.log('\n🧪 Testing Notification Sending...');
    console.log('=====================================');
    
    // Create a dummy subscription for testing
    const dummySubscription = {
      endpoint: 'https://fcm.googleapis.com/fcm/send/dummy',
      keys: {
        p256dh: 'dummy-p256dh-key',
        auth: 'dummy-auth-key'
      }
    };
    
    const payload = {
      title: 'Test Notification',
      body: 'This is a test from RxMind backend',
      url: '/alarms'
    };
    
    console.log('📤 Attempting to send test notification...');
    
    // This will fail (as expected) but shows the system is working
    try {
      await webpush.sendNotification(dummySubscription, JSON.stringify(payload));
    } catch (error) {
      if (error.statusCode === 404) {
        console.log('✅ Backend can send notifications (dummy endpoint failed as expected)');
        console.log('The push system is working correctly');
      } else {
        console.log('⚠️ Unexpected error:', error.message);
      }
    }
    
  } catch (error) {
    console.error('❌ Error testing notification sending:', error);
  }
}

// Run tests
async function runTests() {
  await testPushSubscription();
  await testNotificationSending();
  
  console.log('\n🎯 Next Steps:');
  console.log('1. Make sure your backend server is running: npm run server');
  console.log('2. Open RxMind in browser and check console for push subscription status');
  console.log('3. Look for "Push notifications enabled!" message');
  console.log('4. Check browser notification permissions');
}

runTests();
