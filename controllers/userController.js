const userService = require('../services/userService');
const { handleError } = require('../utils/errorHandler');

// Register a new user
exports.registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    // Validate input
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }
    
    const user = await userService.registerUser({ name, email, password });
    res.status(201).json(user);
  } catch (error) {
    if (error.message.includes('already')) {
      return res.status(400).json({ message: error.message });
    }
    handleError(res, error);
  }
};

// Login user
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Validate input
    if (!email || !password) {
      return res.status(400).json({ message: 'Please provide email and password' });
    }
    
    const user = await userService.loginUser(email, password);
    res.status(200).json(user);
  } catch (error) {
    if (error.message === 'Invalid credentials') {
      return res.status(401).json({ message: error.message });
    }
    handleError(res, error);
  }
};

// Get user profile
exports.getUserProfile = async (req, res) => {
  try {
    const user = await userService.getUserById(req.user.id);
    res.status(200).json(user);
  } catch (error) {
    handleError(res, error);
  }
}; 