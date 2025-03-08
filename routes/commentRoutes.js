const express = require('express');
const userController = require('../controllers/userController');
const { protect } = require('../authMiddleware');
const { handleError } = require('../utils/errorHandler');
const commentService = require('../services/commentService');


// Create a new comment
const router = express.Router();

// Create a new comment
router.post('/:id', protect, async (req, res) => {
  try {
    const comment = await commentService.createComment(req.body, req.params.id, req.user.id);
    res.status(201).json(comment);
  } catch (error) { 
    handleError(res, error);
  }
});

// Get comments by forum ID
router.get('/:id', async (req, res) => {
  try {
    const comments = await commentService.getCommentsByForumId(req.params.id);
    res.status(200).json(comments);
  } catch (error) {
    handleError(res, error);
  }
});

module.exports = router;