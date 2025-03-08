const prisma = require('../config');

const forumService = {}

// Get all forums
forumService.getAllForums = async () => {
  return await prisma.forum.findMany({
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
};

// Get forum by ID
forumService.getForumById = async (id) => {
  return await prisma.forum.findUnique({
    where: { id },
    include: {
      creator: {
        select: {
          id: true,
          name: true
        }
      },
      posts: true
    }
  });
};

// Create a new forum
forumService.createForum = async (data, userId) => {
  return await prisma.forum.create({
    data: {
      title: data.title,
      description: data.description,
      tags: data.tags || [],
      creator: {
        connect: { id: userId }
      }
    }
  });
};

// Update a forum
forumService.updateForum = async (id, data, userId) => {
  // First check if forum exists and user is authorized
  const forum = await prisma.forum.findUnique({
    where: { id }
  });
  
  if (!forum) {
    throw new Error('Forum not found');
  }
  
  if (forum.userId !== userId) {
    throw new Error('Not authorized to update this forum');
  }
  
  // Prepare update data
  const updateData = {
    title: data.title,
    description: data.description,
    tags: data.tags || [],
    updatedAt: new Date()
  };
  
  return await prisma.forum.update({
    where: { id },
    data: updateData
  });
};

// Delete a forum
forumService.deleteForum = async (id, userId) => {
  // First check if forum exists and user is authorized
  const forum = await prisma.forum.findUnique({
    where: { id }
  });
  
  if (!forum) {
    throw new Error('Forum not found');
  }
  
  if (forum.userId !== userId) {
    throw new Error('Not authorized to delete this forum');
  }
  
  return await prisma.forum.delete({
    where: { id }
  });
};

module.exports = forumService;
