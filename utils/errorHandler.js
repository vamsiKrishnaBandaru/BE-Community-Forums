// Error handler helper function
const handleError = (res, error, statusCode = 500) => {
  // Determine appropriate status code based on error type
  if (error.message === 'Not authorized to update this forum' || 
      error.message === 'Not authorized to delete this forum') {
    statusCode = 403;
  } else if (error.message === 'Forum not found') {
    statusCode = 404;
  }
  
  return res.status(statusCode).json({ 
    message: 'Server error', 
    error: error.message
  });
};

module.exports = { handleError }; 