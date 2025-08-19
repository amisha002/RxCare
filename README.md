# RxMind - Medication Reminder App

A comprehensive medication management application built with Next.js, Capacitor, and Node.js.

## 🏗️ Architecture

This project uses a **hybrid architecture**:

- **Frontend**: Static Next.js app (for Capacitor mobile app)
- **Backend**: Express.js server with Node-cron (for online alarms)
- **Database**: PostgreSQL with Prisma ORM

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL database
- Android Studio (for mobile development)

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd RxMind
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file with:
   ```env
   DATABASE_URL="postgresql://username:password@localhost:5432/rxmind"
   ```

4. **Set up the database**
   ```bash
   npx prisma generate
   npx prisma db push
   npm run db:seed
   ```

## 🎯 Development Workflow

### Option 1: Full Stack Development
```bash
npm run dev:full
```
This runs both the frontend (Next.js) and backend (Express) simultaneously.

### Option 2: Frontend Only (for UI development)
```bash
npm run dev
```

### Option 3: Backend Only (for API development)
```bash
npm run server
```

## 📱 Mobile Development with Capacitor

### Build for Mobile
```bash
npm run build
npx cap sync
```

### Open in Android Studio
```bash
npx cap open android
```

### Run on Device/Emulator
```bash
npx cap run android
```

## 🔔 Alarm System

### Offline Mobile Alarms (Capacitor)
- Uses `@capacitor/local-notifications`
- Works offline on mobile devices
- Scheduled locally on the device

### Online Computer Alarms (Node-cron)
- Runs on the Express backend server
- Uses `node-cron` for scheduling
- Can send push notifications, emails, etc.

## 📁 Project Structure

```
RxMind/
├── app/                    # Next.js frontend (static export)
├── api-backup/            # API routes (moved out for static export)
├── android/               # Capacitor Android platform
├── server.js              # Express backend server
├── capacitor.config.ts    # Capacitor configuration
└── prisma/               # Database schema and migrations
```

## 🌐 API Endpoints

The backend server provides these endpoints:

- `POST /api/notifications` - Create notification
- `GET /api/notifications` - Get all notifications
- `GET /api/notifications/due` - Get due notifications
- `POST /api/notifications/acknowledge` - Acknowledge notification

## 🔧 Configuration

### Capacitor
- **App ID**: `com.rxmind.app`
- **Web Directory**: `out/` (static export)
- **Platforms**: Android, iOS

### Backend Server
- **Port**: 3001 (configurable via PORT env var)
- **Cron Schedule**: Every minute (`* * * * *`)

## 🚀 Deployment

### Frontend (Static)
- Build: `npm run build`
- Deploy the `out/` folder to any static hosting service

### Backend (Server)
- Run: `npm run server`
- Deploy to any Node.js hosting service (Heroku, Vercel, etc.)

## 📱 Mobile Features

- ✅ Offline alarm scheduling
- ✅ Local notifications
- ✅ Sound alerts
- ✅ Background processing
- ✅ PWA capabilities

## 💻 Desktop Features

- ✅ Online alarm management
- ✅ Cron-based scheduling
- ✅ Database integration
- ✅ API endpoints
- ✅ Real-time updates

## 🔄 Sync Between Platforms

- Mobile app stores alarms locally
- Backend server manages online alarms
- Data can be synced when online
- Offline-first approach for mobile

## 🐛 Troubleshooting

### Build Issues
- Clear `.next` directory: `rmdir /s /q .next`
- Rebuild: `npm run build`

### Capacitor Issues
- Sync web assets: `npx cap sync`
- Clean Android: `npx cap clean android`

### Database Issues
- Reset database: `npm run db:reset`
- Test connection: `npm run db:test`

## 📄 License

This project is licensed under the MIT License.
