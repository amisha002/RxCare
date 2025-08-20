// Load environment variables first
require('dotenv').config();

const webpush = require('web-push');

// Test VAPID key generation
console.log('🔑 Testing VAPID key generation...');
try {
  const vapidKeys = webpush.generateVAPIDKeys();
  console.log('✅ VAPID keys generated successfully');
  console.log('Public key length:', vapidKeys.publicKey.length);
  console.log('Private key length:', vapidKeys.privateKey.length);
} catch (error) {
  console.error('❌ VAPID key generation failed:', error.message);
}

// Test environment variables
console.log('\n🌍 Checking environment variables...');
const requiredVars = [
  'VAPID_PUBLIC_KEY',
  'VAPID_PRIVATE_KEY', 
  'NEXT_PUBLIC_VAPID_PUBLIC_KEY'
];

let missingVars = [];
requiredVars.forEach(varName => {
  if (!process.env[varName]) {
    missingVars.push(varName);
  }
});

if (missingVars.length === 0) {
  console.log('✅ All required environment variables are set');
} else {
  console.log('❌ Missing environment variables:', missingVars.join(', '));
  console.log('💡 Create a .env file with these variables');
}

// Test server connectivity
console.log('\n🌐 Testing server connectivity...');
const testServer = async () => {
  try {
    const response = await fetch('http://localhost:3001/api/push/test');
    if (response.ok) {
      console.log('✅ Backend server is responding');
    } else {
      console.log('⚠️  Backend server responded with status:', response.status);
    }
  } catch (error) {
    console.log('❌ Cannot connect to backend server:', error.message);
    console.log('💡 Make sure to run: npm run server');
  }
};

testServer();
