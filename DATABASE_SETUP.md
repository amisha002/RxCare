# Database Setup Guide for RxMind Prescriptions

This guide will help you set up the PostgreSQL database and populate it with sample data to display real prescription information on the prescriptions page.

## Prerequisites

1. **PostgreSQL Database**: Make sure you have PostgreSQL installed and running
2. **Node.js**: Ensure Node.js is installed (version 16 or higher)
3. **Environment Variables**: Set up your `.env` file

## Step 1: Environment Configuration

Create a `.env` file in the root directory with the following variables:

```env
# Database Configuration
DATABASE_URL="postgresql://username:password@localhost:5432/rxmind"
DIRECT_URL="postgresql://username:password@localhost:5432/rxmind"

# Other settings
NEXT_PUBLIC_API_BASE_URL=http://localhost:3001
```

Replace `username`, `password`, and `rxmind` with your actual PostgreSQL credentials and database name.

## Step 2: Database Setup

1. **Create the database** (if it doesn't exist):
   ```sql
   CREATE DATABASE rxmind;
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Generate Prisma client**:
   ```bash
   npx prisma generate
   ```

4. **Run database migrations**:
   ```bash
   npx prisma migrate dev --name init
   ```

## Step 3: Seed the Database

Populate the database with sample prescription data:

```bash
npx prisma db seed
```

This will create:
- 1 user (john.doe@example.com)
- 3 prescriptions (Father, Mother, Self)
- 6 medicines across the prescriptions
- Sample notifications for medication reminders

## Step 4: Verify the Setup

1. **Start the development server**:
   ```bash
   npm run dev
   ```

2. **Navigate to the prescriptions page**:
   ```
   http://localhost:3000/prescriptions
   ```

3. **Check the API endpoint**:
   ```
   http://localhost:3000/api/prescriptions?userId=1
   ```

## Database Schema Overview

The database contains the following main tables:

### Users
- Basic user information (email, phone, age)
- Family members (stored as JSON)
- Caregiver information

### Prescriptions
- Linked to users
- Contains family member name
- Optional prescription image

### Medicines
- Linked to prescriptions
- Medicine name, dosage, timing
- Start and end dates
- Duration information

### Notifications
- Medication reminders
- Scheduled times
- Sent status

## Sample Data Created

The seed script creates realistic prescription data:

**User**: john.doe@example.com
**Prescriptions**:
1. **Father's Prescription**:
   - Lisinopril (1 dose daily)
   - Atorvastatin (1 dose daily at night)

2. **Mother's Prescription**:
   - Metformin (2 doses daily)
   - Amoxicillin (2 doses daily)

3. **Self Prescription**:
   - Ibuprofen (as needed)
   - Ventolin HFA (as needed)

## Features Implemented

### Summary Cards
- **Active Medications**: Shows count of medicines with end dates in the future
- **Due for Refill**: Shows medicines expiring within 7 days
- **Total Prescriptions**: Total number of prescriptions
- **Doctors**: Placeholder count (6)

### Prescription Table
- Displays all medicines from all prescriptions
- Shows medication name, dosage, family member, next refill date, and status
- Status indicators: Active, Due Soon, Expired
- Search functionality across medication names and family members
- Responsive design with mobile card view

### Prescription Documents
- Shows prescription images (if available)
- Displays family member, medications, and creation date
- Download and view original buttons

## Troubleshooting

### Common Issues

1. **Database Connection Error**:
   - Verify PostgreSQL is running
   - Check DATABASE_URL in .env file
   - Ensure database exists

2. **Prisma Client Error**:
   - Run `npx prisma generate` after schema changes
   - Restart the development server

3. **No Data Displayed**:
   - Run the seed script: `npx prisma db seed`
   - Check API endpoint returns data
   - Verify user ID in the prescriptions page (currently set to 1)

4. **API Errors**:
   - Check browser console for errors
   - Verify API route is accessible
   - Check server logs for database errors

### Reset Database

To start fresh:

```bash
# Drop and recreate database
npx prisma migrate reset

# Re-seed with sample data
npx prisma db seed
```

## Next Steps

1. **Authentication**: Implement proper user authentication
2. **Real Images**: Add actual prescription image upload functionality
3. **Doctor Information**: Add doctor table and relationships
4. **Notifications**: Implement real-time medication reminders
5. **Data Validation**: Add input validation and error handling

## API Endpoints

- `GET /api/prescriptions?userId={id}`: Fetch prescriptions for a user
- Returns prescriptions with medicines and summary statistics

The API calculates:
- Active medications (not expired)
- Due for refill (expiring within 7 days)
- Total prescriptions count
- Unique doctors count (placeholder)
