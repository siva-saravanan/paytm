// user routers all the routes which are coming to user are handlked here 
const express =  require('express') ; 

const z  = require('zod') ; 
const jwt = require('jsonwebtoken')  ; 
const User = require('../db') ;  
const { JWT_SECRET } = require('../config');
const userroute = express.Router() ; 


const signupSchema  = {
    first_name : z.string().max(50) , 
    last_name  : z.string().max(50) , 
    username  : z.string().max(50).email()  ,
    password   : z.strind.min(6) 
}

const siginSchema =  { 
    username : z.string().max(50).email() ,
    password : z.string().min(8)
}
userroute.post('signup' ,async(res,req) =>{
    const body = req.body  ;
    const {success} = signupSchema.safeParse(body) ;
    //chacking whether the validation is correct or not 
    if(!success){
        return res.send({
            message : "the email has been taken or invalid input "
        })
    }

    //checking whether the username exist already in the db or not 
    const user = User.findOne({
        username : req.body.username
    }); 
    if(user._id){ // if user id exists means it has been already there 
        return res.statusCode(411).send({
            message : "the email has been taken" ,
            token : token
        })
    }
    


    //if not present we have to createone 

    //creating a is an async function so make the function async and use await 
    const dbsuer = await User.create(body) ; 
     

    //provide the jwt token for the new user 
    const token  = jwt.sign({
        userId : user._id
    } ,JWT_SECRET)  ; 

    res.statusCode(200).json({
        message :"user created succesfully " ,
        token : 'jwt'
    })



})

userroute.post('signin' , async(res,req) =>{
    const username  = req.body.username  ; 
    const password = req.body.password ; 
    const body = req.body  ; 
    const {success} = siginSchema.safeParse(body) ; 
    if(!success){
        return res.statusCode(411).send({
            messsage : 'incorrect inputs'
        })
    }
    
    //check in the db for the username 
    const existingUser  = await User.findOne({
        username : username , 
        password : password
    }) ; 
    // if found that will have id 
    if(existingUser==null){
        return res.statusCode(411).send({
            messsage : 'error while logging in'
        })
    }


    //if found na return with jwt token 
    const token  = jwt.sign({
        userId :existingUser._id
    } , JWT_SECRET) ;  
    return res.statusCode(200).send({
            token : token 
    })

})






module.exports =  {
    user
}
