// Minimal push subscription test
// Run this in your browser console to test push notifications

async function testMinimalPush() {
  console.log('🧪 Testing minimal push subscription...');
  
  try {
    // Check basic support
    if (!('serviceWorker' in navigator)) {
      throw new Error('Service Worker not supported');
    }
    
    if (!('PushManager' in window)) {
      throw new Error('Push Manager not supported');
    }
    
    if (!('Notification' in window)) {
      throw new Error('Notifications not supported');
    }
    
    console.log('✅ Basic support check passed');
    
    // Check notification permission
    if (Notification.permission === 'denied') {
      throw new Error('Notification permission denied');
    }
    
    if (Notification.permission === 'default') {
      console.log('🔔 Requesting notification permission...');
      const permission = await Notification.requestPermission();
      if (permission !== 'granted') {
        throw new Error('Notification permission not granted');
      }
    }
    
    console.log('✅ Notification permission granted');
    
    // Wait for service worker
    console.log('🔧 Waiting for service worker...');
    const registration = await navigator.serviceWorker.ready;
    console.log('✅ Service worker ready:', registration);
    
    // Try to get existing subscription
    const existingSubscription = await registration.pushManager.getSubscription();
    if (existingSubscription) {
      console.log('📱 Found existing subscription:', existingSubscription);
      return existingSubscription;
    }
    
    // Create new subscription with minimal options
    console.log('🆕 Creating new subscription...');
    
    // Use a simple test VAPID key (you can replace this)
    const testVapidKey = 'BDZYAjv66CuHJ5kgY5EiDJJxWoswR3W4I-0V2utiZpUnfJ7v9MD1fQ7QMsWG65368QsTd6gsFZZIBgVaq_6twNI';
    
    // Convert to Uint8Array
    const padding = "=".repeat((4 - (testVapidKey.length % 4)) % 4);
    const base64 = (testVapidKey + padding).replace(/-/g, "+").replace(/_/g, "/");
    const rawData = atob(base64);
    const applicationServerKey = new Uint8Array(rawData.length);
    for (let i = 0; i < rawData.length; ++i) {
      applicationServerKey[i] = rawData.charCodeAt(i);
    }
    
    console.log('🔑 VAPID key converted, length:', applicationServerKey.length);
    
    // Attempt subscription
    const subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: applicationServerKey
    });
    
    console.log('✅ Push subscription created successfully!');
    console.log('📱 Subscription:', subscription);
    console.log('🔗 Endpoint:', subscription.endpoint);
    
    return subscription;
    
  } catch (error) {
    console.error('❌ Test failed:', error);
    console.error('Error name:', error.name);
    console.error('Error message:', error.message);
    throw error;
  }
}

// Export for use in console
window.testMinimalPush = testMinimalPush;

console.log('🧪 Minimal push test loaded!');
console.log('Run: testMinimalPush() to test push notifications');
