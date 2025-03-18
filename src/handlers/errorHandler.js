const errorHandler = (error, req, res, next) => {
    console.error(error); // Log the error for debugging
    if (error) {
        res.status(400).json({
            status: 'failed',
            error: error.message || 'An error occurred',
        });
    } else {
        next();
    }
};


module.exports = {
    errorHandler
}