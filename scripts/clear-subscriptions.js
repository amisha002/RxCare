// Clear invalid push subscriptions
async function clearSubscriptions() {
  try {
    console.log('🗑️ Clearing push subscriptions...');
    
    const response = await fetch('http://localhost:3001/api/push/clear', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    if (response.ok) {
      const data = await response.json();
      console.log('✅ Success:', data.message);
    } else {
      console.log('❌ Failed:', response.status, await response.text());
    }
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

// Check subscription count
async function checkCount() {
  try {
    console.log('📊 Checking subscription count...');
    
    const response = await fetch('http://localhost:3001/api/push/count');
    
    if (response.ok) {
      const data = await response.json();
      console.log('📈 Current count:', data.count);
      console.log('📋 Subscriptions:', data.subscriptions.length > 0 ? 'Found data' : 'Empty');
    } else {
      console.log('❌ Failed:', response.status, await response.text());
    }
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

// Run both functions
async function run() {
  await checkCount();
  await clearSubscriptions();
  await checkCount();
}

run();
