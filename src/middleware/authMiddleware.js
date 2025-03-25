const jsonwebtoken = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    /**
     * Middleware that protects routes by verifying JWT
     * Flow:
     * 1. Checks for Authorization header in incoming request
     * 2. Extracts the JWT token (removes "Bearer " prefix)
     * 3. Verifies the token using the secret key
     * 4. If valid, attaches user payload to request object
     * 5. If invalid, blocks access with 401 error
     */
    try {
        // Extract and verify token
        const accessToken = req.headers.authorization.replace("Bearer ", "");
        const jwt_payload = jsonwebtoken.verify(accessToken, process.env.JWT_SALT);

        // Attach user data to request for use in controllers
        req.user = jwt_payload;
        
    } catch(err) {
        // Token verification failed
        return res.status(401).json({
            status: "failed",
            message: "Unauthorized"
        });
    }
    
    // Proceed to the next middleware/controller
    next();
}

module.exports = {
    authMiddleware 
}