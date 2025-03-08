const { PrismaClient } = require('@prisma/client');

// Initialize Prisma client with connection pooling for production
const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL
    }
  }
});

// Export the Prisma client instance
module.exports = prisma;
