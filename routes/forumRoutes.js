const express = require('express');
const router = express.Router();
const forumController = require('../controllers/forumController');
const forumService = require('../services/forumService');
const { protect } = require('../authMiddleware');
const { handleError } = require('../utils/errorHandler');

// Get all forums
router.get('/', forumController.getAllForums);

// Get a single forum
router.get('/:id', forumController.getForumById);

// Create a forum - requires authentication
router.post('/', protect, async (req, res) => {
  try {
    const forum = await forumService.createForum(req.body, req.user.id);
    res.status(201).json(forum);
  } catch (error) {
    handleError(res, error, 400);
  }
});

// Update a forum - requires authentication
router.put('/:id', protect, async (req, res) => {
  try {
    const forum = await forumService.updateForum(req.params.id, req.body, req.user.id);
    res.json(forum);
  } catch (error) {
    handleError(res, error, 400);
  }
});

// Delete a forum - requires authentication
router.delete('/:id', protect, async (req, res) => {
  try {
    await forumService.deleteForum(req.params.id, req.user.id);
    res.json({ message: 'Forum deleted successfully' });
  } catch (error) {
    handleError(res, error);
  }
});

module.exports = router; 