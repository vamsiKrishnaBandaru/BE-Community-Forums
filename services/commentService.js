const prisma = require('../config');

const commentService = {}

commentService.createComment = async (data, forumId, userId) => {
  const comment = await prisma.comment.create({
    data: {
      content: data.content,
      forumId: forumId,
      postId: data.postId,
      authorId: userId,
    },  
  });
  return comment;
};


commentService.getCommentsByForumId = async (forumId) => {
  const comments = await prisma.comment.findMany({
    where: {
      forumId,
    },
    include: {
      author: {
        select: {
          id: true,
          name: true,
          createdAt: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
  return comments;
};

module.exports = commentService;