import { mkdirSync, copyFileSync, existsSync } from "fs";
import { appendFileSync, readFileSync } from "fs";
import { dirname, resolve } from "path";

const projectRoot = process.cwd();
const src = resolve(projectRoot, "public", "alarm.mp3");
const dest = resolve(projectRoot, "android", "app", "src", "main", "res", "raw", "alarm.mp3");

const destDir = dirname(dest);
if (!existsSync(destDir)) {
  mkdirSync(destDir, { recursive: true });
}

copyFileSync(src, dest);
console.log(`Copied alarm.mp3 → ${dest}`);

// Append web push handlers to generated service worker if not already present
try {
  const swPath = resolve(projectRoot, "public", "sw.js");
  const swContent = readFileSync(swPath, "utf8");
  if (!swContent.includes("self.addEventListener('push'")) {
    const pushHandlers = `
// appended by copy-alarm.mjs
self.addEventListener('push', event => {
  let data = {};
  try { data = event.data?.json() || {}; } catch {}
  const title = data.title || 'RxMind';
  const options = {
    body: data.body || 'You have a reminder',
    icon: '/icon-192x192.png',
    badge: '/icon-192x192.png',
    data: { url: data.url || '/alarms' }
  };
  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener('notificationclick', event => {
  event.notification.close();
  const url = event.notification?.data?.url || '/alarms';
  event.waitUntil(
    clients.matchAll({ type: 'window' }).then(list => {
      for (const client of list) {
        if ('focus' in client && client.url.includes(url)) {
          return client.focus();
        }
      }
      return clients.openWindow(url);
    })
  );
});
`;
    appendFileSync(swPath, pushHandlers);
    console.log("Appended push handlers to public/sw.js");
  }
} catch (e) {
  console.warn("Could not append push handlers to sw.js:", e.message);
}


