const webpush = require('web-push');

// Load environment variables
require('dotenv').config();

console.log('🔑 Testing VAPID Key Format and Compatibility...\n');

const VAPID_PUBLIC = process.env.VAPID_PUBLIC_KEY;
const VAPID_PRIVATE = process.env.VAPID_PRIVATE_KEY;

if (!VAPID_PUBLIC || !VAPID_PRIVATE) {
  console.error('❌ VAPID keys not found in environment variables!');
  process.exit(1);
}

console.log('📋 VAPID Public Key Details:');
console.log('   Length:', VAPID_PUBLIC.length);
console.log('   Starts with:', VAPID_PUBLIC.substring(0, 20) + '...');
console.log('   Ends with:', '...' + VAPID_PUBLIC.substring(VAPID_PUBLIC.length - 20));
console.log('   Format valid:', /^[A-Za-z0-9_-]+$/.test(VAPID_PUBLIC));
console.log('');

console.log('📋 VAPID Private Key Details:');
console.log('   Length:', VAPID_PRIVATE.length);
console.log('   Starts with:', VAPID_PRIVATE.substring(0, 20) + '...');
console.log('   Ends with:', '...' + VAPID_PRIVATE.substring(VAPID_PRIVATE.length - 20));
console.log('   Format valid:', /^[A-Za-z0-9_-]+$/.test(VAPID_PRIVATE));
console.log('');

// Test key conversion
console.log('🔧 Testing Key Conversion...');
try {
  // Simulate browser conversion
  const padding = "=".repeat((4 - (VAPID_PUBLIC.length % 4)) % 4);
  const base64 = (VAPID_PUBLIC + padding).replace(/-/g, "+").replace(/_/g, "/");
  
  console.log('   Original length:', VAPID_PUBLIC.length);
  console.log('   Padded length:', (VAPID_PUBLIC + padding).length);
  console.log('   Base64 conversion successful:', !!base64);
  
  // Test web-push library
  webpush.setVapidDetails('mailto:test@example.com', VAPID_PUBLIC, VAPID_PRIVATE);
  console.log('   Web-push library accepts keys: ✅');
  
} catch (error) {
  console.error('   Web-push library error:', error.message);
}

console.log('');

// Test with different VAPID subject formats
console.log('📧 Testing VAPID Subject Formats...');
const subjects = [
  'mailto:test@example.com',
  'mailto:admin@rxmind.com',
  'https://rxmind.com',
  'https://localhost:3000'
];

subjects.forEach(subject => {
  try {
    webpush.setVapidDetails(subject, VAPID_PUBLIC, VAPID_PRIVATE);
    console.log(`   ${subject}: ✅`);
  } catch (error) {
    console.log(`   ${subject}: ❌ ${error.message}`);
  }
});

console.log('');

// Generate new keys for comparison
console.log('🆕 Generating New Keys for Comparison...');
try {
  const newKeys = webpush.generateVAPIDKeys();
  console.log('   New public key length:', newKeys.publicKey.length);
  console.log('   New private key length:', newKeys.privateKey.length);
  console.log('   Format matches:', 
    newKeys.publicKey.length === VAPID_PUBLIC.length &&
    newKeys.privateKey.length === VAPID_PRIVATE.length
  );
} catch (error) {
  console.error('   Error generating new keys:', error.message);
}

console.log('');
console.log('💡 If the format is valid but push still fails, try:');
console.log('   1. Using HTTPS instead of localhost');
console.log('   2. Checking browser push service status');
console.log('   3. Testing in a different browser');
console.log('   4. Using the newly generated keys above');
