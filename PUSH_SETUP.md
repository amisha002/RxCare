# 🔔 Push Notification Setup Guide for RxMind

## Overview
This guide will help you set up web push notifications for your RxMind app so that medication reminders work even when the app is not open.

## Prerequisites
- Node.js installed
- Your RxMind app running locally

## Step 1: Generate VAPID Keys

### Option A: Using the provided script
1. Make sure you're in your RxMind project directory
2. Run: `node scripts/generate-vapid.js`
3. Copy the generated keys

### Option B: Manual generation
1. Install web-push globally: `npm install -g web-push`
2. Run: `web-push generate-vapid-keys`
3. Copy the generated keys

## Step 2: Create Environment File

1. Create a `.env` file in your project root (if it doesn't exist)
2. Add the following variables:

```env
# VAPID Keys (replace with your actual keys)
VAPID_PUBLIC_KEY=your_generated_public_key_here
VAPID_PRIVATE_KEY=your_generated_private_key_here
NEXT_PUBLIC_VAPID_PUBLIC_KEY=your_generated_public_key_here
VAPID_SUBJECT=mailto:your-email@example.com

# API Configuration
NEXT_PUBLIC_API_BASE_URL=http://localhost:3001

# Database (if needed)
DATABASE_URL="postgresql://username:password@localhost:5432/rxmind"
```

## Step 3: Start Your Servers

1. **Start the backend server** (in one terminal):
   ```bash
   npm run server
   ```

2. **Start the Next.js app** (in another terminal):
   ```bash
   npm run dev
   ```

## Step 4: Test Push Notifications

1. Open your app in the browser
2. Accept notification permissions when prompted
3. Check the browser console for push subscription logs
4. Test by sending a push notification:
   ```bash
   curl -X POST http://localhost:3001/api/push/test
   ```

## Troubleshooting

### Common Issues:

1. **"Registration failed - push service error"**
   - Check that VAPID keys are correctly set in `.env`
   - Ensure backend server is running on port 3001
   - Verify browser supports push notifications

2. **"VAPID key not found"**
   - Make sure `.env` file exists and has correct variables
   - Restart your development server after adding `.env`

3. **Service worker registration fails**
   - Check that `sw-dev.js` exists in `public/` folder
   - Ensure HTTPS in production (localhost works for development)

4. **Push subscription fails**
   - Check browser console for detailed error messages
   - Verify notification permissions are granted
   - Ensure backend `/api/push/subscribe` endpoint is working

### Debug Steps:

1. Check browser console for detailed logs
2. Verify environment variables are loaded:
   ```javascript
   console.log(process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY)
   ```
3. Test backend endpoint directly:
   ```bash
   curl http://localhost:3001/api/push/test
   ```

## Production Considerations

- Use HTTPS (required for push notifications)
- Store VAPID keys securely
- Consider using environment-specific keys
- Monitor push delivery rates
- Handle subscription expiration

## Files Modified

- `lib/pushClient.ts` - Enhanced error handling and validation
- `components/pwa/pwa-wrapper.tsx` - Added retry logic and status tracking
- `server.js` - Push notification endpoints
- `public/sw-dev.js` - Service worker for handling push events

## Need Help?

If you're still experiencing issues:
1. Check the browser console for error messages
2. Verify all environment variables are set
3. Ensure both servers are running
4. Test with a simple push notification first
