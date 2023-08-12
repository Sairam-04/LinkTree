const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    try{
        let token = req.header('x-token');
        if(!token){
            return res.status(400).send("Token Not Found")
        }
        let decoded = jwt.verify(token,'jwtPassword');
        req.user = decoded.user;
        next();
    }
    catch(err){
        console.error(err);
        return res.status(400).send("Authentication Error")
    }
}