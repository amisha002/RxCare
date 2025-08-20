export async function subscribeToPush(vapidPublicKey: string): Promise<boolean> {
  console.log("🔍 Starting push subscription process...");
  console.log("🔑 VAPID Key length:", vapidPublicKey.length);
  console.log("🔑 VAPID Key starts with:", vapidPublicKey.substring(0, 20) + "...");
  console.log("🔑 VAPID Key ends with:", vapidPublicKey.substring(vapidPublicKey.length - 10));

  // Validate VAPID key format
  if (!vapidPublicKey || vapidPublicKey.length < 80 || vapidPublicKey.length > 100) {
    console.error("❌ Invalid VAPID key length:", vapidPublicKey.length);
    return false;
  }

  if (!/^[A-Za-z0-9_-]+$/.test(vapidPublicKey)) {
    console.error("❌ Invalid VAPID key format - contains invalid characters");
    return false;
  }

  console.log("✅ VAPID key format validation passed");

  if (!("serviceWorker" in navigator) || !("PushManager" in window)) {
    console.log("❌ Service Worker or Push Manager not supported");
    return false;
  }

  try {
    // Ensure notifications are permitted (prompt if needed)
    if ("Notification" in window) {
      console.log("🔔 Notification permission status:", Notification.permission);
      if (Notification.permission === "denied") {
        console.log("❌ Notification permission denied");
        return false;
      }
      if (Notification.permission === "default") {
        console.log("🔔 Requesting notification permission...");
        const perm = await Notification.requestPermission();
        console.log("🔔 Permission result:", perm);
        if (perm !== "granted") {
          console.log("❌ Notification permission not granted");
          return false;
        }
      }
    }

    // Wait for service worker to be ready and ensure it's active
    console.log("🔍 Waiting for service worker to be ready...");
    const reg = await navigator.serviceWorker.ready;
    console.log("✅ Service worker ready:", reg);
    console.log("🔧 Service worker state:", reg.active?.state);
    console.log("🔧 Service worker scriptURL:", reg.active?.scriptURL);

    // Ensure service worker is active
    if (!reg.active || reg.active.state !== 'activated') {
      console.log("⏳ Waiting for service worker to be fully activated...");
      await new Promise(resolve => {
        if (reg.active && reg.active.state === 'activated') {
          resolve(true);
        } else {
          reg.addEventListener('activate', () => resolve(true), { once: true });
        }
      });
      console.log("✅ Service worker is now fully activated");
    }

    // Add a small delay to ensure everything is settled
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log("⏳ Waited 1 second for service worker to settle...");

    // Check for existing subscription
    const existing = await reg.pushManager.getSubscription();
    const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3001";
    console.log("🌐 API Base URL:", apiBase);

    if (existing) {
      console.log("📱 Existing push subscription found, sending to backend...");
      try {
        await fetch(`${apiBase}/api/push/subscribe`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(existing),
        });
        console.log("✅ Existing subscription sent to backend");
        return true;
      } catch (error) {
        console.error("❌ Error sending existing subscription to backend:", error);
        // Continue to create new subscription
      }
    }

    console.log("🆕 Creating new push subscription...");
    console.log("🔑 Converting VAPID key to Uint8Array...");
    
    // Convert VAPID key to Uint8Array
    const applicationServerKey = urlBase64ToUint8Array(vapidPublicKey);

    // Validate the converted key
    console.log("🔑 Raw VAPID Key (length):", vapidPublicKey.length);
    console.log("🔑 Raw VAPID Key (start):", vapidPublicKey.substring(0, 30) + "...");
    console.log("🔑 Raw VAPID Key (end):", vapidPublicKey.substring(vapidPublicKey.length - 30) + "...");
    console.log("🔑 Application server key (Uint8Array length):", applicationServerKey.length);
    console.log("🔑 Application server key (first 10 bytes):", Array.from(applicationServerKey.slice(0, 10)));
    console.log("🔑 Application server key (last 10 bytes):", Array.from(applicationServerKey.slice(-10)));

    if (applicationServerKey.length !== 65) {
      console.error("❌ Invalid applicationServerKey length:", applicationServerKey.length, "(expected 65)");
      return false;
    }

    // Create push subscription with proper error handling
    console.log("🚀 Attempting to subscribe to push manager...");
    console.log("🔧 Service worker registration state:", reg.active?.state);
    console.log("🔧 Push manager available:", !!reg.pushManager);
    
    const sub = await reg.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: applicationServerKey,
    });
    
    console.log("✅ New push subscription created:", sub);
    console.log("📱 Subscription endpoint:", sub.endpoint);
    console.log("📱 Subscription keys:", {
      p256dh: sub.getKey('p256dh') ? 'Present' : 'Missing',
      auth: sub.getKey('auth') ? 'Present' : 'Missing'
    });

    // Send subscription to backend
    console.log("📤 Sending new subscription to backend...");
    const response = await fetch(`${apiBase}/api/push/subscribe`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(sub),
    });

    if (!response.ok) {
      console.error("❌ Backend error:", response.status, response.statusText);
      throw new Error(`Backend error: ${response.status} ${response.statusText}`);
    }

    console.log("✅ New subscription sent to backend");
    console.log("🎯 Returning TRUE - push subscription successful!");
    return true;
  } catch (error) {
    console.error("❌ Push subscription failed:", error);
    if (error instanceof Error) {
      console.error("❌ Error details:", error.message);
      console.error("❌ Error stack:", error.stack);
      console.error("❌ Error name:", error.name);
    }
    
    // Log additional debugging info
    if (error instanceof Error && error.message.includes("push service error")) {
      console.error("🔍 This usually means:");
      console.error("   1. VAPID keys are incorrect");
      console.error("   2. Backend server is not running");
      console.error("   3. Network connectivity issues");
      console.error("   4. Browser push service is down");
      console.error("   5. Service worker registration issues");
    }
    
    // Check if it's a service worker issue
    if (error instanceof Error && error.message.includes("service worker")) {
      console.error("🔧 Service worker issue detected");
      console.error("   Check if sw-dev.js is accessible at:", window.location.origin + '/sw-dev.js');
    }
    
    console.log("🎯 Returning FALSE - push subscription failed");
    return false;
  }
}

function urlBase64ToUint8Array(base64String: string): Uint8Array {
  try {
    console.log("🔧 Converting base64 string:", base64String.substring(0, 20) + "...");
    const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
    console.log("🔧 Padded and converted base64:", base64.substring(0, 20) + "...");
    
    const rawData = window.atob(base64);
    console.log("🔧 Raw data length:", rawData.length);
    
    const outputArray = new Uint8Array(rawData.length);
    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    
    console.log("🔧 Final Uint8Array length:", outputArray.length);
    return outputArray;
  } catch (error) {
    console.error("❌ Error converting VAPID key:", error);
    throw new Error("Invalid VAPID key format");
  }
}
