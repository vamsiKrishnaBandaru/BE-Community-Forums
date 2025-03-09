const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { PrismaClient } = require('@prisma/client');
const morgan = require('morgan');

// Load environment variables
dotenv.config();

// Initialize Prisma
const prisma = new PrismaClient();

// Initialize express
const app = express();
const PORT = process.env.PORT || 10000;

// Debug environment variables
console.log('Environment variables loaded:');
console.log('DATABASE_URL exists:', !!process.env.DATABASE_URL);
console.log('JWT_SECRET exists:', !!process.env.JWT_SECRET);

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Add this before your routes
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  
  // Capture the original res.json to add logging
  const originalJson = res.json;
  res.json = function(body) {
    console.log(`${new Date().toISOString()} - Response: ${res.statusCode}`);
    if (res.statusCode >= 400) {
      console.log('Response body:', body);
    }
    return originalJson.call(this, body);
  };
  
  next();
});

// Root route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the Forum API' });
});

// Routes
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/forums', require('./routes/forumRoutes'));
app.use('/api/comments', require('./routes/commentRoutes'));

// Add this error handling middleware at the end of your middleware chain
app.use((err, req, res, next) => {
  console.error('Error details:', err);
  res.status(500).json({
    message: 'Server error',
    error: process.env.NODE_ENV === 'production' ? 'An unexpected error occurred' : err.message
  });
});

// Add more detailed logging for unhandled rejections
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

// Server start
const startServer = async () => {
  try {
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Unable to start server:', error);
    await prisma.$disconnect();
  }
};

startServer();

// Handle shutdown gracefully
process.on('SIGINT', async () => {
  await prisma.$disconnect();
  process.exit(0);
}); 