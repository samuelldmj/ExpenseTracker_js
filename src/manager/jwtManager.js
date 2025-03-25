const jsonwebtoken = require('jsonwebtoken');

const jwtManager = (userData) => {
    /**
     * Creates a JWT token containing user identity
     * Flow: 
     * 1. Takes user data after successful login/registration
     * 2. Encrypts the user ID and name into a token
     * 3. This token will be used to authenticate subsequent requests
     */
    const accessToken = jsonwebtoken.sign({
        _id: userData.id,        // User's database ID
        name: userData.full_name, // User's full name
    }, process.env.JWT_SALT);    // Secret key for encryption

    return accessToken;
}

module.exports = {
    jwtManager
}