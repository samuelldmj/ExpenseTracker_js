const { default: mongoose } = require("mongoose");

const userDashboardController = async (req, res) => {
    /**
     * Protected route that serves user dashboard data
     * Flow:
     * 1. authMiddleware verifies token and attaches user data
     * 2. Uses the authenticated user's ID from req.user
     * 3. Fetches user data from database (excluding password)
     * 4. Returns user data to client
     */
    const userModel = mongoose.model('users');

    // Get user data using ID from verified JWT
    const getUser = await userModel.findOne({
        _id: req.user._id, // From authMiddleware
    }).select("-password"); // Exclude sensitive data

    res.status(200).json({
        status: "success",
        message: "User dashboard active",
        data: getUser
    });
}

module.exports = {
    userDashboardController,
}