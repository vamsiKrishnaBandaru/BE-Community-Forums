const prisma = require('../config');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userService = {}

userService.registerUser = async ({ name, email, password }) => {
  // Check if user already exists
  const existingUser = await prisma.user.findFirst({
    where: {
      email
    }
  });

  if (existingUser) {
    throw new Error('User with this email already exists');
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create user
  try {
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword
      }
    });

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user.id)
    };
  } catch (error) {
    // Additional error handling for database errors
    console.error('Error creating user:', error);
    if (error.code === 'P2002') {
      const field = error.meta?.target[0] || 'field';
      throw new Error(`User with this ${field} already exists`);
    }
    throw error;
  }
};

// Login user
userService.loginUser = async (email, password) => {
  // Find user by email
  const user = await prisma.user.findUnique({
    where: { email }
  });
  
  if (!user) {
    throw new Error('Invalid credentials');
  }
  
  // Check password
  const isMatch = await bcrypt.compare(password, user.password);
  
  if (!isMatch) {
    throw new Error('Invalid credentials');
  }
  
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    token: generateToken(user.id)
  };
};

// Get user by ID
userService.getUserById = async (id) => {
  const user = await prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      email: true,
      createdAt: true,
      forums: {
        select: {
          id: true,
          title: true,
          createdAt: true
        }
      }
    }
  });
  
  if (!user) {
    throw new Error('User not found');
  }
  
  return user;
};

// Generate JWT
const generateToken = (userId) => {
  if (!process.env.JWT_SECRET) {
    console.error('JWT_SECRET environment variable is not set!');
    throw new Error('Server configuration error: JWT_SECRET is missing');
  }
  
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

module.exports = userService;
