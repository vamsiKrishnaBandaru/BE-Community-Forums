const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { protect } = require('../authMiddleware');
const { handleError } = require('../utils/errorHandler');

// Register a new user
router.post('/register', userController.registerUser);

// Login user
router.post('/login', userController.loginUser);

// Get user profile (protected route)
router.get('/profile', protect, userController.getUserProfile);

module.exports = router;
