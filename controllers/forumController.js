const prisma = require('../config');

// Get all forums
exports.getAllForums = async (req, res) => {
  try {
    console.log('Attempting to fetch all forums');
    
    const forums = await prisma.forum.findMany({
      include: {
        creator: {
          select: {
            id: true,
            name: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });
    
    console.log(`Successfully fetched ${forums.length} forums`);
    res.status(200).json(forums);
  } catch (error) {
    console.error('Error fetching forums:', error);
    console.error('Error stack:', error.stack);
    res.status(500).json({ 
      message: 'Server error', 
      error: error.message,
      stack: process.env.NODE_ENV === 'production' ? null : error.stack
    });
  }
};

// Get forum by ID
exports.getForumById = async (req, res) => {
  try {
    const forum = await prisma.forum.findUnique({
      where: { id: req.params.id },
      include: {
        creator: {
          select: {
            id: true,
            name: true
          }
        },
        comments: {
          include: {
            author: {
              select: {
                id: true,
                name: true
              }
            }
          }
        }
      }
    });
    
    if (!forum) {
      return res.status(404).json({ message: 'Forum not found' });
    }
    
    res.status(200).json(forum);
  } catch (error) {
    console.error('Error fetching forum:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Create a new forum
exports.createForum = async (req, res) => {
  try {
    const { title, description, tags } = req.body;
    
    if (!title || !description) {
      return res.status(400).json({ message: 'Title and description are required' });
    }
    
    const newForum = await prisma.forum.create({
      data: {
        title,
        description,
        tags: tags || [],
        userId: req.user.id // Assuming req.user is set by auth middleware
      }
    });
    
    res.status(201).json(newForum);
  } catch (error) {
    console.error('Error creating forum:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update a forum
exports.updateForum = async (req, res) => {
  try {
    const { title, description, tags } = req.body;
    const forum = await prisma.forum.findUnique({
      where: { id: req.params.id }
    });
    
    if (!forum) {
      return res.status(404).json({ message: 'Forum not found' });
    }
    
    // Check if user is the creator
    if (forum.userId !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to update this forum' });
    }
    
    const updatedForum = await prisma.forum.update({
      where: { id: req.params.id },
      data: {
        title: title || forum.title,
        description: description || forum.description,
        tags: tags || forum.tags
      }
    });
    
    res.status(200).json(updatedForum);
  } catch (error) {
    console.error('Error updating forum:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete a forum
exports.deleteForum = async (req, res) => {
  try {
    const forum = await prisma.forum.findUnique({
      where: { id: req.params.id }
    });
    
    if (!forum) {
      return res.status(404).json({ message: 'Forum not found' });
    }
    
    // Check if user is the creator
    if (forum.userId !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to delete this forum' });
    }
    
    await prisma.forum.delete({
      where: { id: req.params.id }
    });
    
    res.status(200).json({ message: 'Forum deleted successfully' });
  } catch (error) {
    console.error('Error deleting forum:', error);
    res.status(500).json({ message: 'Server error' });
  }
}; 