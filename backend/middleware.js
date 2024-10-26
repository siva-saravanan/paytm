// verify all the autheticated request the user sends 
const {JWT_SECRET} = require('./config.js') ;
const jwt = require('jsonwebtoken')  ; 


const authMiddleware = (res,req,next)=>{
    const authHeader  = req.headers.authorization;

    if(!authHeader || !authHeader.startsWith('Bearer')){  // either it is null or it does'nt start with bearer 
        res.status(403).json({}) ; 
    }
    const token  = authHeader.split('')[1] ; // we need the second part as we need the token thing which comes after the Bearer

    //using try and catch 
    try{
        const decoded = jwt.verify(
            token  , JWT_SECRET
        ) ; 
        // the decoded will turn into username again as oibject 
        if(decoded.userId){
            req.userId = decoded.userId ; 
            next() ; 
        }
        else{
            res.status(403).json({})
        }
    }
    catch{
        res.status(403).json({
            message  : ' an error occured '
        })
    }



    module.exports = {
        authMiddleware
    }



} ; 