export async function subscribeToPush(vapidPublicKey: string): Promise<boolean> {
  console.log("🔍 Starting push subscription process...")
  console.log("🔑 VAPID Key length:", vapidPublicKey.length)
  console.log("🔑 VAPID Key starts with:", vapidPublicKey.substring(0, 20) + "...")
  
  // Validate VAPID key format
  if (!vapidPublicKey || vapidPublicKey.length < 80 || vapidPublicKey.length > 100) {
    console.error("❌ Invalid VAPID key length:", vapidPublicKey.length)
    return false
  }
  
  if (!/^[A-Za-z0-9_-]+$/.test(vapidPublicKey)) {
    console.error("❌ Invalid VAPID key format - contains invalid characters")
    return false
  }
  
  console.log("✅ VAPID key format validation passed")
  
  if (!('serviceWorker' in navigator) || !('PushManager' in window)) {
    console.log("❌ Service Worker or Push Manager not supported")
    return false;
  }
  try {
    // Ensure notifications are permitted (prompt if needed)
    if ('Notification' in window) {
      console.log("🔔 Notification permission status:", Notification.permission)
      if (Notification.permission === 'denied') {
        console.log("❌ Notification permission denied")
        return false;
      }
      if (Notification.permission === 'default') {
        console.log("🔔 Requesting notification permission...")
        const perm = await Notification.requestPermission();
        console.log("🔔 Permission result:", perm)
        if (perm !== 'granted') {
          console.log("❌ Notification permission not granted")
          return false;
        }
      }
    }

    // Try to use current registration immediately; fallback to .ready
    console.log("🔍 Getting service worker registration...")
    let reg = await navigator.serviceWorker.getRegistration();
    if (!reg) {
      console.log("🔍 No registration found, waiting for ready...")
      reg = await navigator.serviceWorker.ready;
    }
    console.log("✅ Service worker registration found:", reg)
    
    const existing = await reg.pushManager.getSubscription();
    const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL || '';
    console.log("🌐 API Base URL:", apiBase)
    
    if (existing) {
      console.log("📱 Existing push subscription found, sending to backend...")
      // Ensure backend records the subscription even if it already exists in the browser
      try {
        await fetch(`${apiBase}/api/push/subscribe`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(existing),
        });
        console.log("✅ Existing subscription sent to backend")
      } catch (error) {
        console.error("❌ Error sending existing subscription to backend:", error)
      }
      return true;
    }

    console.log("🆕 Creating new push subscription...")
    console.log("🔑 Converting VAPID key to Uint8Array...")
    const applicationServerKey = urlBase64ToUint8Array(vapidPublicKey);
    console.log("🔑 Application server key length:", applicationServerKey.length)
    
    const sub = await reg.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: applicationServerKey,
    });
    console.log("✅ New push subscription created:", sub)

    console.log("📤 Sending new subscription to backend...")
    await fetch(`${apiBase}/api/push/subscribe`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(sub),
    });
    console.log("✅ New subscription sent to backend")
    return true;
  } catch (error) {
    console.error("❌ Push subscription failed:", error)
    if (error instanceof Error) {
      console.error("❌ Error details:", error.message)
      console.error("❌ Error stack:", error.stack)
    }
    return false;
  }
}

function urlBase64ToUint8Array(base64String: string) {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}


