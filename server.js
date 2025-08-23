require('dotenv').config();
const express = require('express');
const cron = require('node-cron');
const cors = require('cors');
const { PrismaClient } = require('./lib/generated/prisma');
const bcrypt = require('bcryptjs');
const webpush = require('web-push');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 3001;

// In-memory dedupe to avoid resending the same notification every minute
const pushedNotificationIds = new Set();

// CORS configuration - MUST be before routes
app.use(cors({
  // origin: [
  //   'http://localhost:3000',
  //   'http://127.0.0.1:3000',
  //   'http://localhost:3001',
  //   'http://127.0.0.3001',
  //   'http://localhost:3002',
  //   'http://127.0.0.1:3002',
  //   'http://localhost:3003',
  //   'http://127.0.0.1:3003'
  // ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Middleware
app.use(express.json());

// JWT Utility Functions
function generateJti() {
  return crypto.randomUUID();
}

function sha256(input) {
  return crypto.createHash("sha256").update(input).digest("hex");
}

function signAccessToken(payload) {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "30m" });
}

function signRefreshToken(payload) {
  return jwt.sign(payload, process.env.REFRESH_SECRET, { expiresIn: "30d" });
}

function verifyAccessToken(token) {
  return jwt.verify(token, process.env.JWT_SECRET);
}

function verifyRefreshToken(token) {
  return jwt.verify(token, process.env.REFRESH_SECRET);
}

// Authentication Middleware
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  try {
    const decoded = verifyAccessToken(token);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ error: 'Invalid or expired token' });
  }
}

// Web Push setup (VAPID)
const VAPID_PUBLIC = process.env.VAPID_PUBLIC_KEY;
const VAPID_PRIVATE = process.env.VAPID_PRIVATE_KEY;
const VAPID_SUBJECT = process.env.VAPID_SUBJECT || 'mailto:admin@example.com';
if (VAPID_PUBLIC && VAPID_PRIVATE) {
  webpush.setVapidDetails(VAPID_SUBJECT, VAPID_PUBLIC, VAPID_PRIVATE);
}

// In-memory store for demo; ideally persist by user in DB
// Key by endpoint to deduplicate repeated subscriptions
const pushSubscriptions = new Map(); // endpoint -> subscription

app.post('/api/push/subscribe', (req, res) => {
  try {
    const sub = req.body;
    console.log('📥 Received subscription data:', JSON.stringify(sub, null, 2));
    
    if (!sub || !sub.endpoint) {
      console.log('❌ Invalid subscription: missing endpoint');
      return res.status(400).json({ error: 'Invalid subscription - missing endpoint' });
    }
    
    if (!sub.keys || !sub.keys.p256dh || !sub.keys.auth) {
      console.log('❌ Invalid subscription: missing keys');
      return res.status(400).json({ error: 'Invalid subscription - missing keys' });
    }
    
    // Validate key lengths (accept base64url with or without padding)
    const p256dhLen = sub.keys.p256dh.length; // 65 bytes -> 88 (padded) or 87 (unpadded)
    if (p256dhLen !== 87 && p256dhLen !== 88) {
      console.log('❌ Invalid p256dh key length:', p256dhLen);
      return res.status(400).json({ error: 'Invalid p256dh key length' });
    }

    const authLen = sub.keys.auth.length; // 16 bytes -> 24 (padded) or 22 (unpadded)
    if (authLen !== 22 && authLen !== 24) {
      console.log('❌ Invalid auth key length:', authLen);
      return res.status(400).json({ error: 'Invalid auth key length' });
    }
    
    // Test the subscription with web-push to ensure it's valid
    try {
      webpush.sendNotification(sub, JSON.stringify({ test: true }));
      console.log('✅ Subscription validated successfully');
    } catch (validationError) {
      console.log('❌ Subscription validation failed:', validationError.message);
      return res.status(400).json({ error: 'Invalid subscription format' });
    }
    
    // Deduplicate by endpoint
    pushSubscriptions.set(sub.endpoint, sub);
    console.log(`🔔 Push subscribed successfully. Total unique: ${pushSubscriptions.size}`);
    return res.json({ success: true, message: 'Subscription stored' });
    
  } catch (e) {
    console.error('❌ Error in push subscription:', e);
    return res.status(500).json({ error: e.message });
  }
});

async function sendPushToAll(payload) {
  const tasks = [];
  for (const [endpoint, sub] of pushSubscriptions.entries()) {
    tasks.push(
      webpush.sendNotification(sub, JSON.stringify(payload)).catch(() => {
        // Remove invalid subscriptions
        pushSubscriptions.delete(endpoint);
      })
    );
  }
  await Promise.allSettled(tasks);
}

// Clear all subscriptions (for debugging)
app.post('/api/push/clear', (req, res) => {
  try {
    const oldCount = pushSubscriptions.size;
    pushSubscriptions.clear();
    console.log(`🗑️ Cleared ${oldCount} subscriptions`);
    return res.json({ success: true, message: `Cleared ${oldCount} subscriptions` });
  } catch (e) {
    console.error('❌ Error clearing subscriptions:', e);
    return res.status(500).json({ error: e.message });
  }
});

// Get subscription count (for debugging)
app.get('/api/push/count', (req, res) => {
  try {
    return res.json({ count: pushSubscriptions.size, subscriptions: Array.from(pushSubscriptions.values()) });
  } catch (e) {
    console.error('❌ Error getting subscription count:', e);
    return res.status(500).json({ error: e.message });
  }
});

// Test push endpoint
app.post('/api/push/test', async (req, res) => {
  try {
    const currentCount = pushSubscriptions.size;
    console.log(`🔔 Sending test push to ${currentCount} subscription(s)`);
    
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

// Start cron jobs
function startCron() {
  cron.schedule("* * * * *", async () => {
    const now = new Date();

    const due = await prisma.notification.findMany({
      where: {
        scheduled_time: { lte: now },
        sent: false,
      },
      include: { medicine: true },
    });

    for (const n of due) {
      if (pushedNotificationIds.has(n.id)) {
        continue; // already pushed this one
      }
      console.log(`⏰ Alarm for ${n.medicine.medicine_name}`);
      // Try web push so users see a system notification even if the page is closed
      try {
        await sendPushToAll({
          title: 'Medication Reminder',
          body: `Time to take ${n.medicine.medicine_name}`,
          url: '/alarms',
          notificationId: n.id,
        });
        pushedNotificationIds.add(n.id);
      } catch {}
      // Do not mark as sent; the client acknowledges explicitly
    }
  });
  
  console.log('🚀 Cron jobs started');
}

// Protected API Routes (require authentication)
app.post('/api/notifications', authenticateToken, async (req, res) => {
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

app.get('/api/notifications', authenticateToken, async (req, res) => {
  try {
    const notifications = await prisma.notification.findMany({
      include: {
        medicine: true,
      },
    });

    res.json(notifications);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/notifications/due', authenticateToken, async (req, res) => {
  try {
    const now = new Date();

    const dueNotifications = await prisma.notification.findMany({
      where: {
        scheduled_time: { lte: now },
        sent: false,
      },
      include: {
        medicine: true,
      },
    });

    res.json(dueNotifications);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/notifications/acknowledge', authenticateToken, async (req, res) => {
  try {
    const { id, action } = req.body;

    if (!id || !action) {
      return res.status(400).json({ error: "id and action are required" });
    }

    // Mark as sent and drop from dedupe set
    await prisma.notification.update({
      where: { id: parseInt(id) },
      data: { sent: true },
    });
    try { pushedNotificationIds.delete(parseInt(id)); } catch {}

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
app.post("/api/users/signup", async (req, res) => {
  try {
    const {
      email,
      password,
      age,
      phone_number,
      caregiver_phone_verified,
      caregiver_phone,
      family_members,
    } = req.body;

    // Validation
    if (!email || !password || !phone_number || !age) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Check if email already exists
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        phone_number,
        caregiver_phone,
        caregiver_phone_verified: caregiver_phone_verified || false,
        age: parseInt(age, 10),
        family_members: family_members || [],
      },
    });

    return res.status(201).json({
      message: "User registered successfully",
      user: {
        id: newUser.id,
        email: newUser.email,
        phone_number: newUser.phone_number,
        caregiver_phone: newUser.caregiver_phone,
        caregiver_phone_verified: newUser.caregiver_phone_verified,
        age: newUser.age,
        family_members: newUser.family_members,
      },
    });
  } catch (error) {
    console.error("❌ Signup error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Login endpoint
app.post("/api/users/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    // Find user
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // Verify password
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // Create tokens
    const accessToken = signAccessToken({ sub: user.id, email: user.email });
    const jti = generateJti();
    const refreshToken = signRefreshToken({ sub: user.id, jti });

    // Persist hashed refresh token
    const tokenHash = sha256(refreshToken);
    const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30); // 30 days

    const userAgent = req.headers["user-agent"] || "unknown";
    const ip = req.headers["x-forwarded-for"]?.split(",")[0] || req.ip || "unknown";

    await prisma.token.create({
      data: {
        userId: user.id,
        jti,
        tokenHash,
        type: "REFRESH",
        userAgent,
        ip,
        expiresAt,
      },
    });

    // Return tokens and user info
    return res.status(200).json({
      message: "Login successful",
      token: accessToken,
      refreshToken,
      user: {
        id: user.id,
        email: user.email,
        phone_number: user.phone_number,
        caregiver_phone: user.caregiver_phone,
        caregiver_phone_verified: user.caregiver_phone_verified,
        age: user.age,
        family_members: user.family_members,
      },
    });
  } catch (error) {
    console.error("❌ Login error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Refresh token endpoint
app.post("/api/users/refresh", async (req, res) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(400).json({ error: "Refresh token is required" });
    }

    // Verify refresh token
    let decoded;
    try {
      decoded = verifyRefreshToken(refreshToken);
    } catch (error) {
      return res.status(401).json({ error: "Invalid refresh token" });
    }

    // Check if token exists in database
    const tokenHash = sha256(refreshToken);
    const tokenRecord = await prisma.token.findFirst({
      where: {
        tokenHash,
        jti: decoded.jti,
        type: "REFRESH",
        expiresAt: { gt: new Date() },
        revokedAt: null,
      },
    });

    if (!tokenRecord) {
      return res.status(401).json({ error: "Invalid refresh token" });
    }

    // Get user
    const user = await prisma.user.findUnique({
      where: { id: decoded.sub },
    });

    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }

    // Generate new tokens
    const newAccessToken = signAccessToken({ sub: user.id, email: user.email });
    const newJti = generateJti();
    const newRefreshToken = signRefreshToken({ sub: user.id, jti: newJti });

    // Update token record
    const newTokenHash = sha256(newRefreshToken);
    await prisma.token.update({
      where: { id: tokenRecord.id },
      data: {
        jti: newJti,
        tokenHash: newTokenHash,
        expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
      },
    });

    return res.status(200).json({
      message: "Token refreshed successfully",
      token: newAccessToken,
      refreshToken: newRefreshToken,
    });
  } catch (error) {
    console.error("❌ Refresh token error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Logout endpoint
app.post("/api/users/logout", authenticateToken, async (req, res) => {
  try {
    const { refreshToken } = req.body;

    if (refreshToken) {
      const tokenHash = sha256(refreshToken);
      await prisma.token.updateMany({
        where: {
          tokenHash,
          userId: req.user.sub,
          type: "REFRESH",
        },
        data: {
          revokedAt: new Date(),
        },
      });
    }

    return res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.error("❌ Logout error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Get current user endpoint
app.get("/api/users/me", authenticateToken, async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.sub },
      select: {
        id: true,
        email: true,
        phone_number: true,
        caregiver_phone: true,
        caregiver_phone_verified: true,
        age: true,
        family_members: true,
        created_at: true,
      },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.status(200).json({ user });
  } catch (error) {
    console.error("❌ Get user error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Backend server running on port ${PORT}`);
  startCron();
});
