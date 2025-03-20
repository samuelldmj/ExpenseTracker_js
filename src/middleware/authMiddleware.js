const jsonwebtoken = require('jsonwebtoken');


const authMiddleware = (req, res, next) => {
    console.log('Hello from middleware');
    // console.log(req.headers.authorization);

    try {
        //extract the token from the header
    const accessToken =  req.headers.authorization.replace("Bearer ", "" );
    const jwt_payload =  jsonwebtoken.verify(accessToken, process.env.JWT_SALT);

    req.user = jwt_payload;
    }catch(err){
       return res.status(401).json({
            status : "failed",
            message : "Unauthorized"
        })
    }
    
    next();
}

module.exports = {
    authMiddleware 
}