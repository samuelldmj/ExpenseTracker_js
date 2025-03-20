const jsonwebtoken = require('jsonwebtoken');


const jwtManager = (userData) => {

    const accessToken = jsonwebtoken.sign({
        _id: userData.id,
        name: userData.full_name,
    }, process.env.JWT_SALT);

    return accessToken;
}

module.exports = {
    jwtManager
}










































