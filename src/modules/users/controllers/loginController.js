const { default: mongoose } = require("mongoose");
const bcrypt = require('bcrypt');
const { jwtManager } = require("../../../manager/jwtManager");

const loginController = async (req, res) => {
    /**
     * Handles user authentication
     * Flow:
     * 1. Receives email and password from request body
     * 2. Finds user by email in database
     * 3. Compares provided password with stored hash
     * 4. If valid, generates JWT token
     * 5. Returns token to client for future authenticated requests
     */
    const { email, password } = req.body;
    const userModel = mongoose.model('users');

    // Find user and verify password
    getUserByEmail = await userModel.findOne({ email: email });
    const comparePassword = await bcrypt.compare(password, getUserByEmail.password);

    if (!getUserByEmail || !comparePassword) {
        return res.status(400).json({
            status: "failed",
            message: "Invalid email or password"
        });
    }

    // Successful login - generate and return token
    res.status(200).json({
        status: "success",
        message: "user logged in successfully",
        accessToken: jwtManager(getUserByEmail) // Generate JWT
    });
}

module.exports = {
    loginController
}