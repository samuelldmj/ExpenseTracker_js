const errorHandler = (error, req, res, next) => {
    console.error(error); // Log the error for debugging
    
    // Determine status code based on error type
    const statusCode = error.statusCode || 400;
    
    res.status(statusCode).json({
        status: 'failed',
        error: error.message || error.toString() || 'An error occurred',
    });
};

module.exports = {
    errorHandler
}