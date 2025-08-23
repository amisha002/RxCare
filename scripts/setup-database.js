#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Setting up RxMind Database...\n');

// Check if .env file exists
const envPath = path.join(process.cwd(), '.env');
if (!fs.existsSync(envPath)) {
  console.log('❌ .env file not found!');
  console.log('Please create a .env file with the following content:');
  console.log(`
# Database Configuration
DATABASE_URL="postgresql://username:password@localhost:5432/rxmind"
DIRECT_URL="postgresql://username:password@localhost:5432/rxmind"

# Other settings
NEXT_PUBLIC_API_BASE_URL=http://localhost:3001
  `);
  process.exit(1);
}

try {
  // Step 1: Generate Prisma client
  console.log('📦 Generating Prisma client...');
  execSync('npx prisma generate', { stdio: 'inherit' });
  console.log('✅ Prisma client generated successfully!\n');

  // Step 2: Run database migrations
  console.log('🔄 Running database migrations...');
  execSync('npx prisma migrate dev --name init', { stdio: 'inherit' });
  console.log('✅ Database migrations completed!\n');

  // Step 3: Seed the database
  console.log('🌱 Seeding database with sample data...');
  execSync('npx prisma db seed', { stdio: 'inherit' });
  console.log('✅ Database seeded successfully!\n');

  console.log('🎉 Database setup completed!');
  console.log('\nNext steps:');
  console.log('1. Start the development server: npm run dev');
  console.log('2. Navigate to: http://localhost:3000/prescriptions');
  console.log('3. You should see real prescription data from the database!');

} catch (error) {
  console.error('❌ Error during database setup:', error.message);
  console.log('\nTroubleshooting tips:');
  console.log('1. Make sure PostgreSQL is running');
  console.log('2. Check your DATABASE_URL in .env file');
  console.log('3. Ensure the database exists');
  console.log('4. Try running commands manually:');
  console.log('   - npx prisma generate');
  console.log('   - npx prisma migrate dev --name init');
  console.log('   - npx prisma db seed');
  process.exit(1);
}
