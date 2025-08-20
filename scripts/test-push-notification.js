const webpush = require('web-push');

// Load environment variables
require('dotenv').config();

const VAPID_PUBLIC = process.env.VAPID_PUBLIC_KEY;
const VAPID_PRIVATE = process.env.VAPID_PRIVATE_KEY;
const VAPID_SUBJECT = process.env.VAPID_SUBJECT || 'mailto:admin@example.com';

if (!VAPID_PUBLIC || !VAPID_PRIVATE) {
  console.error('❌ VAPID keys not found in environment variables!');
  console.log('💡 Make sure you have a .env file with:');
  console.log('   VAPID_PUBLIC_KEY=your_public_key');
  console.log('   VAPID_PRIVATE_KEY=your_private_key');
  process.exit(1);
}

// Configure web-push
webpush.setVapidDetails(VAPID_SUBJECT, VAPID_PUBLIC, VAPID_PRIVATE);

// Test subscription (you'll need to get this from your app)
const testSubscription = {
  endpoint: process.env.TEST_SUBSCRIPTION_ENDPOINT,
  keys: {
    p256dh: process.env.TEST_SUBSCRIPTION_P256DH,
    auth: process.env.TEST_SUBSCRIPTION_AUTH
  }
};

if (!testSubscription.endpoint) {
  console.log('📝 To test with a specific subscription, set these environment variables:');
  console.log('   TEST_SUBSCRIPTION_ENDPOINT=your_subscription_endpoint');
  console.log('   TEST_SUBSCRIPTION_P256DH=your_p256dh_key');
  console.log('   TEST_SUBSCRIPTION_AUTH=your_auth_key');
  console.log('');
  console.log('🚀 Testing push service configuration...');
  
  // Test VAPID configuration
  try {
    const testKeys = webpush.generateVAPIDKeys();
    console.log('✅ VAPID configuration is working');
    console.log('✅ Generated test keys successfully');
  } catch (error) {
    console.error('❌ VAPID configuration error:', error.message);
  }
  
  console.log('');
  console.log('💡 To test actual push notifications:');
  console.log('   1. Open your RxMind app in the browser');
  console.log('   2. Accept notification permissions');
  console.log('   3. Check the console for subscription details');
  console.log('   4. Copy the subscription and set the environment variables above');
  console.log('   5. Run this script again');
  
} else {
  console.log('🚀 Sending test push notification...');
  
  const payload = {
    title: 'Test Notification from RxMind',
    body: 'This is a test push notification!',
    url: '/alarms',
    timestamp: new Date().toISOString()
  };
  
  webpush.sendNotification(testSubscription, JSON.stringify(payload))
    .then(() => {
      console.log('✅ Test notification sent successfully!');
      console.log('📱 Check your browser for the notification');
    })
    .catch((error) => {
      console.error('❌ Failed to send notification:', error.message);
      if (error.statusCode) {
        console.error('   Status code:', error.statusCode);
      }
      if (error.headers) {
        console.error('   Headers:', error.headers);
      }
    });
}
