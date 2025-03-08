const { PrismaClient } = require('@prisma/client');

// Check if DATABASE_URL is set
if (!process.env.DATABASE_URL) {
  console.error('DATABASE_URL environment variable is not set!');
  console.error('Please set DATABASE_URL in your environment variables.');
  process.exit(1); // Exit with error code
}

// Initialize Prisma client
const prisma = new PrismaClient();

// Export the Prisma client instance
module.exports = prisma;
