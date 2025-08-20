// // Development Service Worker for RxMind
// console.log('🔧 Service Worker: Installing...');

// // Install e
// self.addeListener('install', (e) => {
//   console.log('🔧 Service Worker: Install e');
//   self.skipWaiting();
// });



// // Activate e
// self.addeListener('activate', (e) => {
//   console.log('🔧 Service Worker: Activate e');
//   e.waitUntil(self.clients.claim());
// });



// // Push e - when notification arrives
// self.addeListener('push', (e) => {
//   console.log('🔔 Service Worker: Push e received');
  
//   if (e.data) {
//     try {
//       const data = e.data.json();
//       console.log('📋 Push data:', data);
      
//       // Show notification (no sound here - will play when user lands on alarms page)
//       const tagId = data.notificationId ? `medication-reminder-${data.notificationId}` : 'medication-reminder-generic';
//       const options = {
//         body: data.body || 'Time to take your medicine!',
//         icon: '/icon-192x192.png',
//         badge: '/icon-192x192.png',
//         tag: tagId,
//         renotify: true,
//         silent: false,
//         vibrate: [200, 100, 200],
//         requireInteraction: true,
//         actions: [
//           {
//             action: 'view',
//             title: 'View Alarm',
//             icon: '/icon-192x192.png'
//           }
//         ],
//         data: {
//           ...data,
//           timestamp: Date.now()
//         }
//       };
      
//       e.waitUntil((async () => {
//         try {
//           await self.registration.showNotification(data.title || 'Medication Reminder', options);
//           const list = await self.registration.getNotifications({ includeTriggered: true });
//           console.log('✅ Notification displayed. Active notifications:', list.length);
//         } catch (err) {
//           console.error('❌ showNotification failed:', err);
//         }
//       })());
      
//     } catch (error) {
//       console.error('❌ Error parsing push data:', error);
      
//       // Fallback notification
//       const options = {
//         body: 'Time to take your medicine!',
//         icon: '/icon-192x192.png',
//         badge: '/icon-192x192.png',
//         requireInteraction: true,
//         renotify: true,
//         silent: false,
//         vibrate: [200, 100, 200],
//         actions: [
//           {
//             action: 'view',
//             title: 'View Alarm',
//             icon: '/icon-192x192.png'
//           }
//         ],
//         data: { url: '/alarms', timestamp: Date.now() }
//       };
      
//       e.waitUntil((async () => {
//         try {
//           await self.registration.showNotification('Medication Reminder', options);
//           const list = await self.registration.getNotifications({ includeTriggered: true });
//           console.log('✅ Fallback notification displayed. Active notifications:', list.length);
//         } catch (err) {
//           console.error('❌ Fallback showNotification failed:', err);
//         }
//       })());
//     }
//   } else {
//     // No data payload - show a generic reminder
//     const options = {
//       body: 'Time to take your medicine!',
//       icon: '/icon-192x192.png',
//       badge: '/icon-192x192.png',
//       tag: 'medication-reminder',
//       renotify: true,
//       silent: false,
//       vibrate: [200, 100, 200],
//       requireInteraction: true,
//       actions: [
//         {
//           action: 'view',
//           title: 'View Alarm',
//           icon: '/icon-192x192.png'
//         }
//       ],
//       data: { url: '/alarms', timestamp: Date.now() }
//     };
//     e.waitUntil((async () => {
//       try {
//         await self.registration.showNotification('Medication Reminder', options);
//         const list = await self.registration.getNotifications({ includeTriggered: true });
//         console.log('✅ Generic notification displayed. Active notifications:', list.length);
//       } catch (err) {
//         console.error('❌ Generic showNotification failed:', err);
//       }
//     })());
//   }
// });

// // Function to play alarm sound
// async function playAlarmSound() {
//   try {
//     console.log('🔊 Service Worker: Playing alarm sound...');
    
//     // Create audio context for better browser compatibility
//     const audioContext = new (self.AudioContext || self.webkitAudioContext)();
    
//     // Fetch the audio file
//     const response = await fetch('/alarm.mp3');
//     const arrayBuffer = await response.arrayBuffer();
    
//     // Decode the audio
//     const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
    
//     // Create source and play
//     const source = audioContext.createBufferSource();
//     source.buffer = audioBuffer;
//     source.connect(audioContext.destination);
//     source.loop = true; // Loop the alarm sound
    
//     // Start playing
//     source.start(0);
    
//     // Store reference to stop later
//     self.alarmSource = source;
    
//     console.log('✅ Service Worker: Alarm sound started successfully');
    
//     // Auto-stop after 30 seconds to pre infinite looping
//     setTimeout(() => {
//       if (self.alarmSource) {
//         self.alarmSource.stop();
//         self.alarmSource = null;
//         console.log('⏹️ Service Worker: Alarm sound auto-stopped after 30 seconds');
//       }
//     }, 30000);
    
//   } catch (error) {
//     console.error('❌ Service Worker: Failed to play alarm sound:', error);
//   }
// }

// // Function to stop alarm sound
// function stopAlarmSound() {
//   if (self.alarmSource) {
//     self.alarmSource.stop();
//     self.alarmSource = null;
//     console.log('⏹️ Service Worker: Alarm sound stopped');
//   }
// }

// // Notification click e
// self.addeListener('notificationclick', (e) => {
//   console.log('🖱️ Service Worker: Notification clicked');
//   console.log('📋 Action:', e.action);
//   console.log('📋 Notification data:', e.notification.data);

//   e.notification.close();

//   const targetPath = (e.notification?.data && e.notification.data.url) || '/alarms';
//   const notificationId = e.notification?.data?.notificationId;

//   e.waitUntil((async () => {
//     try {
//       const urlObj = new URL(targetPath, self.location.origin);
//       urlObj.searchParams.set('fromNotification', '1');
//       urlObj.searchParams.set('ts', String(Date.now()));
//       if (notificationId) {
//         urlObj.searchParams.set('nid', String(notificationId));
//       }
//       const targetUrl = urlObj.toString();

//       const windowClients = await self.clients.matchAll({ type: 'window', includeUncontrolled: true });
//       console.log('🔍 Found clients:', windowClients.length);

//       for (const client of windowClients) {
//         try {
//           await client.focus();
//           if ('navigate' in client) {
//             await client.navigate(targetUrl);
//           }
//           try { client.postMessage({ type: 'NOTIFICATION_CLICKED' }); } catch {}
//           return;
//         } catch (e) {
//           console.warn('⚠️ Failed to focus/navigate existing client:', e);
//         }
//       }

//       console.log('🆕 No existing windows found, opening new alarms page...');
//       const newClient = await self.clients.openWindow(targetUrl);
//       try { newClient && newClient.postMessage({ type: 'NOTIFICATION_CLICKED' }); } catch {}
//     } catch (error) {
//       console.error('❌ Error handling notification click:', error);
//       await self.clients.openWindow('/alarms');
//     }
//   })());
// });

// // Notification close e
// self.addeListener('notificationclose', (e) => {
//   console.log('❌ Service Worker: Notification closed');
//   // Don't stop alarm sound here - let it play when user lands on alarms page
// });

// // Push subscription change e
// self.addeListener('pushsubscriptionchange', (e) => {
//   console.log('🔄 Service Worker: Push subscription changed');
//   // Handle subscription renewal if needed
// });

// // Background sync e
// self.addeListener('sync', (e) => {
//   console.log('🔄 Service Worker: Background sync e:', e.tag);
//   // Handle background sync if needed
// });

// // Message e for communication with main thread
// self.addeListener('message', (e) => {
//   console.log('💬 Service Worker: Message received:', e.data);
  
//   if (e.data && e.data.type === 'STOP_ALARM') {
//     stopAlarmSound();
//     e.ports[0].postMessage({ success: true });
//   }
// });



// Development Service Worker for RxMind
console.log('🔧 Service Worker: Installing...');

// Install e
self.addeListener('install', (e) => {
  console.log('🔧 Service Worker: Install e');
  self.skipWaiting();
});



// Activate e
self.addeListener('activate', (e) => {
  console.log('🔧 Service Worker: Activate e');
  e.waitUntil(self.clients.claim());
});



// Push e - when notification arrives
self.addeListener('push', (e) => {
  console.log('🔔 Service Worker: Push e received');
  
  if (e.data) {
    try {
      const data = e.data.json();
      console.log('📋 Push data:', data);
      
      // Show notification (no sound here - will play when user lands on alarms page)
      const tagId = data.notificationId ? `medication-reminder-${data.notificationId}` : 'medication-reminder-generic';
      const options = {
        body: data.body || 'Time to take your medicine!',
        icon: '/icon-192x192.png',
        badge: '/icon-192x192.png',
        tag: tagId,
        renotify: true,
        silent: false,
        vibrate: [200, 100, 200],
        requireInteraction: true,
        actions: [
          {
            action: 'view',
            title: 'View Alarm',
            icon: '/icon-192x192.png'
          }
        ],
        data: {
          ...data,
          timestamp: Date.now()
        }
      };
      
      e.waitUntil((async () => {
        try {
          await self.registration.showNotification(data.title || 'Medication Reminder', options);
          const list = await self.registration.getNotifications({ includeTriggered: true });
          console.log('✅ Notification displayed. Active notifications:', list.length);
        } catch (err) {
          console.error('❌ showNotification failed:', err);
        }
      })());
      
    } catch (error) {
      console.error('❌ Error parsing push data:', error);
      
      // Fallback notification
      const options = {
        body: 'Time to take your medicine!',
        icon: '/icon-192x192.png',
        badge: '/icon-192x192.png',
        requireInteraction: true,
        renotify: true,
        silent: false,
        vibrate: [200, 100, 200],
        actions: [
          {
            action: 'view',
            title: 'View Alarm',
            icon: '/icon-192x192.png'
          }
        ],
        data: { url: '/alarms', timestamp: Date.now() }
      };
      
      e.waitUntil((async () => {
        try {
          await self.registration.showNotification('Medication Reminder', options);
          const list = await self.registration.getNotifications({ includeTriggered: true });
          console.log('✅ Fallback notification displayed. Active notifications:', list.length);
        } catch (err) {
          console.error('❌ Fallback showNotification failed:', err);
        }
      })());
    }
  } else {
    // No data payload - show a generic reminder
    const options = {
      body: 'Time to take your medicine!',
      icon: '/icon-192x192.png',
      badge: '/icon-192x192.png',
      tag: 'medication-reminder',
      renotify: true,
      silent: false,
      vibrate: [200, 100, 200],
      requireInteraction: true,
      actions: [
        {
          action: 'view',
          title: 'View Alarm',
          icon: '/icon-192x192.png'
        }
      ],
      data: { url: '/alarms', timestamp: Date.now() }
    };
    e.waitUntil((async () => {
      try {
        await self.registration.showNotification('Medication Reminder', options);
        const list = await self.registration.getNotifications({ includeTriggered: true });
        console.log('✅ Generic notification displayed. Active notifications:', list.length);
      } catch (err) {
        console.error('❌ Generic showNotification failed:', err);
      }
    })());
  }
});

// Function to play alarm sound
async function playAlarmSound() {
  try {
    console.log('🔊 Service Worker: Playing alarm sound...');
    
    // Create audio context for better browser compatibility
    const audioContext = new (self.AudioContext || self.webkitAudioContext)();
    
    // Fetch the audio file
    const response = await fetch('/alarm.mp3');
    const arrayBuffer = await response.arrayBuffer();
    
    // Decode the audio
    const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
    
    // Create source and play
    const source = audioContext.createBufferSource();
    source.buffer = audioBuffer;
    source.connect(audioContext.destination);
    source.loop = true; // Loop the alarm sound
    
    // Start playing
    source.start(0);
    
    // Store reference to stop later
    self.alarmSource = source;
    
    console.log('✅ Service Worker: Alarm sound started successfully');
    
    // Auto-stop after 30 seconds to pre infinite looping
    setTimeout(() => {
      if (self.alarmSource) {
        self.alarmSource.stop();
        self.alarmSource = null;
        console.log('⏹️ Service Worker: Alarm sound auto-stopped after 30 seconds');
      }
    }, 30000);
    
  } catch (error) {
    console.error('❌ Service Worker: Failed to play alarm sound:', error);
  }
}

// Function to stop alarm sound
function stopAlarmSound() {
  if (self.alarmSource) {
    self.alarmSource.stop();
    self.alarmSource = null;
    console.log('⏹️ Service Worker: Alarm sound stopped');
  }
}

// Notification click e
self.addeListener('notificationclick', (e) => {
  console.log('🖱️ Service Worker: Notification clicked');
  console.log('📋 Action:', e.action);
  console.log('📋 Notification data:', e.notification.data);

  e.notification.close();

  const targetPath = (e.notification?.data && e.notification.data.url) || '/alarms';
  const notificationId = e.notification?.data?.notificationId;

  e.waitUntil((async () => {
    try {
      const urlObj = new URL(targetPath, self.location.origin);
      urlObj.searchParams.set('fromNotification', '1');
      urlObj.searchParams.set('ts', String(Date.now()));
      if (notificationId) {
        urlObj.searchParams.set('nid', String(notificationId));
      }
      const targetUrl = urlObj.toString();

      const windowClients = await self.clients.matchAll({ type: 'window', includeUncontrolled: true });
      console.log('🔍 Found clients:', windowClients.length);

      for (const client of windowClients) {
        try {
          await client.focus();
          if ('navigate' in client) {
            await client.navigate(targetUrl);
          }
          try { client.postMessage({ type: 'NOTIFICATION_CLICKED' }); } catch {}
          return;
        } catch (e) {
          console.warn('⚠️ Failed to focus/navigate existing client:', e);
        }
      }

      console.log('🆕 No existing windows found, opening new alarms page...');
      const newClient = await self.clients.openWindow(targetUrl);
      try { newClient && newClient.postMessage({ type: 'NOTIFICATION_CLICKED' }); } catch {}
    } catch (error) {
      console.error('❌ Error handling notification click:', error);
      await self.clients.openWindow('/alarms');
    }
  })());
});

// Notification close e
self.addeListener('notificationclose', (e) => {
  console.log('❌ Service Worker: Notification closed');
  // Don't stop alarm sound here - let it play when user lands on alarms page
});

// Push subscription change e
self.addeListener('pushsubscriptionchange', (e) => {
  console.log('🔄 Service Worker: Push subscription changed');
  // Handle subscription renewal if needed
});

// Background sync e
self.addeListener('sync', (e) => {
  console.log('🔄 Service Worker: Background sync e:', e.tag);
  // Handle background sync if needed
});

// Message e for communication with main thread
self.addeListener('message', (e) => {
  console.log('💬 Service Worker: Message received:', e.data);
  
  if (e.data && e.data.type === 'STOP_ALARM') {
    stopAlarmSound();
    e.ports[0].postMessage({ success: true });
  }
});


