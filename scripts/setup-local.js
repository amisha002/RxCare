const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Setting up RxMind Local Database...\n');

// Create a simple .env file for local development
const envContent = `# Local Development Environment
JWT_SECRET=b259effd8a423c1eed289d136a973b1c2965463ddc0906ad78eed807d6da1622
REFRESH_SECRET=78d59c14d24bb722f14fc526ebeaf7f78a826c030b78f5abd0f529818bf83e3d
NODE_ENV=development
NEXT_PUBLIC_API_BASE_URL=http://localhost:3001
VAPID_PUBLIC_KEY=BDrGwzj0JEev1LtgPm6jmj3p2ySPCIVII-emvPyH8zYPCxaSSahKGkAXLBsSiknFPFqsjZg0g4CsO50a08Xqheo
VAPID_PRIVATE_KEY=v4q4P6b9TOkRacgnjqII8vY0hgloxlVbZZ6E2xbbaXw
VAPID_SUBJECT=mailto:shubhradeeproy343@gmail.com
SNOOZE_SECONDS=300

# Local PostgreSQL Database (you can change these values)
DB_URL="postgresql://postgres:password@localhost:5432/rxmind_local"
`;

try {
  // Write .env file
  fs.writeFileSync('.env', envContent);
  console.log('✅ Created .env file for local development');

  // Step 1: Generate Prisma client
  console.log('\n📦 Generating Prisma client...');
  execSync('npx prisma generate', { stdio: 'inherit' });
  console.log('✅ Prisma client generated successfully!');

  // Step 2: Push schema to database (creates tables)
  console.log('\n🔄 Pushing schema to database...');
  execSync('npx prisma db push', { stdio: 'inherit' });
  console.log('✅ Database schema created successfully!');

  // Step 3: Seed the database with prescription data
  console.log('\n🌱 Seeding database with prescription data...');
  execSync('node scripts/seed-prescriptions.js', { stdio: 'inherit' });
  console.log('✅ Database seeded successfully!');

  console.log('\n🎉 Local database setup completed!');
  console.log('\n📋 Next steps:');
  console.log('1. Start the development server: npm run dev');
  console.log('2. Navigate to: http://localhost:3000/prescriptions');
  console.log('3. You should see real prescription data from your local database!');
  
  console.log('\n📊 What was created:');
  console.log('- 1 User (john.doe@example.com)');
  console.log('- 4 Prescriptions (Father, Mother, Self, Grandmother)');
  console.log('- 11 Medicines with realistic schedules');
  console.log('- Sample notifications for medication reminders');

} catch (error) {
  console.error('❌ Error during setup:', error.message);
  console.log('\n🔧 Troubleshooting tips:');
  console.log('1. Make sure PostgreSQL is running on localhost:5432');
  console.log('2. Create a database named "rxmind_local"');
  console.log('3. Update DB_URL in .env with your actual credentials');
  console.log('4. Try running commands manually:');
  console.log('   - npx prisma generate');
  console.log('   - npx prisma db push');
  console.log('   - node scripts/seed-prescriptions.js');
  process.exit(1);
}
