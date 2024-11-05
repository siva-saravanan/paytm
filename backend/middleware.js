
const jwt =  require('jsonwebtoken')  ; 
const { JWT_SECRET } = require('./config');
const  authMiddleware = (req,res,next) =>{
    // checks the authorization header and validate the token 

    const authHeader =  req.headers.authorization ; 
    if(!authHeader || !authHeader.startsWith('Bearer ')){
        return res.status(403).json({
            message : "middle st 1 failed"
        }) ; 
    }

    const token =  authHeader.split(' ')[1] ; 

    try{
        const decoded = jwt.verify( token  ,  JWT_SECRET) ; 
        req.userId = decoded.userId  ; 
        next() ;
    }
    catch(err){
        return res.status(411).json({})
    }

}
module.exports = authMiddleware ;