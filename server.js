require('dotenv').config();
const express = require('express');
const cron = require('node-cron');
const cors = require('cors');
const { PrismaClient } = require('./lib/generated/prisma');
const webpush = require('web-push');

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.json());
// Web Push setup (VAPID)
const VAPID_PUBLIC = process.env.VAPID_PUBLIC_KEY;
const VAPID_PRIVATE = process.env.VAPID_PRIVATE_KEY;
const VAPID_SUBJECT = process.env.VAPID_SUBJECT || 'mailto:admin@example.com';
if (VAPID_PUBLIC && VAPID_PRIVATE) {
  webpush.setVapidDetails(VAPID_SUBJECT, VAPID_PUBLIC, VAPID_PRIVATE);
}

// In-memory store for demo; ideally persist by user in DB
const pushSubscriptions = new Set();

app.post('/api/push/subscribe', (req, res) => {
  try {
    const sub = req.body;
    if (!sub || !sub.endpoint) return res.status(400).json({ error: 'Invalid subscription' });
    pushSubscriptions.add(sub);
    console.log(`🔔 Push subscribed. Total: ${pushSubscriptions.size}`);
    return res.json({ success: true });
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
});

async function sendPushToAll(payload) {
  const tasks = [];
  for (const sub of pushSubscriptions) {
    tasks.push(
      webpush.sendNotification(sub, JSON.stringify(payload)).catch(() => {
        // Remove invalid subscriptions
        pushSubscriptions.delete(sub);
      })
    );
  }
  await Promise.allSettled(tasks);
}

// Test push endpoint
app.post('/api/push/test', async (req, res) => {
  try {
    await sendPushToAll({
      title: 'Test Notification',
      body: 'This is a test push from RxMind',
      url: '/alarms',
    });
    res.json({ success: true, count: pushSubscriptions.size });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});
app.use(cors({
  origin: [
    'http://localhost:3000',
    'http://127.0.0.1:3000',
    'http://localhost:3001',
    'http://127.0.0.1:3001',
    'http://localhost:3002',
    'http://127.0.0.1:3002',
    'http://localhost:3003',
    'http://127.0.0.1:3003'
  ],
}));

// Start cron jobs
function startCron() {
  cron.schedule("* * * * *", async () => {
    const now = new Date();

    const due = await prisma.notification.findMany({
      where: {
        scheduled_time: { lte: now },
        sent: false,
      },
      include: { medicine: true, user: true },
    });

    for (const n of due) {
      console.log(`⏰ Alarm for ${n.medicine.medicine_name}`);
      // Try web push so users see a system notification even if the page is closed
      try {
        await sendPushToAll({
          title: 'Medication Reminder',
          body: `Time to take ${n.medicine.medicine_name}`,
          url: '/alarms',
        });
      } catch {}
      // Do not mark as sent; the client acknowledges explicitly
    }
  });
  
  console.log('🚀 Cron jobs started');
}

// API Routes
app.post('/api/notifications', async (req, res) => {
  try {
    const { userId, medicineId, scheduled_time } = req.body;

    if (!userId || !medicineId || !scheduled_time) {
      return res.status(400).json({ error: "userId, medicineId, and scheduled_time are required" });
    }

    const newNotification = await prisma.notification.create({
      data: {
        userId,
        medicineId,
        scheduled_time: new Date(scheduled_time),
      },
    });

    res.status(201).json(newNotification);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/notifications', async (req, res) => {
  try {
    const notifications = await prisma.notification.findMany({
      include: {
        user: true,
        medicine: true,
      },
    });

    res.json(notifications);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/notifications/due', async (req, res) => {
  try {
    const now = new Date();

    const dueNotifications = await prisma.notification.findMany({
      where: {
        scheduled_time: { lte: now },
        sent: false,
      },
      include: {
        medicine: true,
        user: true,
      },
    });

    res.json(dueNotifications);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/notifications/acknowledge', async (req, res) => {
  try {
    const { id, action } = req.body;

    if (!id || !action) {
      return res.status(400).json({ error: "id and action are required" });
    }

    await prisma.notification.update({
      where: { id: parseInt(id) },
      data: { sent: true },
    });

    if (action === "snooze") {
      const notification = await prisma.notification.findUnique({
        where: { id: parseInt(id) },
        include: { medicine: true },
      });

      if (notification) {
        const now = new Date();
        const snoozeSecondsEnv = process.env.SNOOZE_SECONDS;
        const defaultSeconds = process.env.NODE_ENV === 'production' ? 300 : 10; // 5m prod, 10s dev
        const snoozeSeconds = snoozeSecondsEnv ? parseInt(snoozeSecondsEnv, 10) : defaultSeconds;
        const snoozeTime = new Date(now.getTime() + snoozeSeconds * 1000);

        await prisma.notification.create({
          data: {
            userId: notification.userId,
            medicineId: notification.medicineId,
            scheduled_time: snoozeTime,
          },
        });
      }
    }

    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Backend server running on port ${PORT}`);
  startCron();
});
