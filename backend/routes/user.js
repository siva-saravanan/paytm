const express =require('express') ; 
const userRouter  = express.Router() ; 

//json web token , zod , moongoose models  
const z =  require('zod') ; 
const jwt = require('jsonwebtoken') ;
const {User, Accounts} = require('../db')  ;
const { use } = require('./account');
const {JWT_SECRET} =require('../config') ;
const authMiddleware = require('../middleware');
//zod schemas

const signupBody = z.object({
    username  : z.string().email() ,
    password : z.string() , 
    firstName : z.string() ,
    lastName : z.string()
}) ;

const signinBody = z.object({
    username  : z.string().email() ,
    password : z.string() , 
}); 

const updateBody = z.object({
    password : z.string().optional(), 
    firstName : z.string().optional() ,
    lastName : z.string().optional()
}) ; 

userRouter.post('/signup' ,async (req,res) =>{
        const body = req.body  ; 
        const {success}  = signupBody.safeParse(body) ;
        if(!success){
            return res.status(411).json({
                message : "Incorrect inputs"
            })
        }  


        //check whether we have any existing users 
        const existingUser = await User.findOne( {username : body.username}) ; 
        if(existingUser){
            return res.status(411).json({
                message : "Email already taken"
            }) 
        }

        // if any user don't exist 
        // create and issue the json token
        const newuser  = await User.create({
            username : body.username ,
            password : body.password ,
            firstName : body.firstName ,
            lastName : body.lastName
        })  ;
        
        const userId = newuser._id ; 
        const token =  jwt.sign({userId}, JWT_SECRET) ; 
        await Accounts.create( {
            userId : userId ,
            balance :1+ Math.random()*10000 
        })
        
        return res.json({
            message : "User created successfully",
            token: token
        })
})

userRouter.post('/signin' , async (req, res)=>{
    const body =  req.body ; 
    const { success} = signinBody.safeParse(body) ; 
    if(!success){
        return res.status(411).json({
            message : "Incorrect inputs"
        })
    }
    const existingUser = await User.findOne( {username : body.username}) ; 
        if(existingUser){
            // provide the token

            const token  =  jwt.sign({username : body.username} , JWT_SECRET) ; 

            return res.status(200).json({
                token : token 
            })
        }
        else{
            return res.status(411).json({
                message : "user don't exist"
            })
        }
})

userRouter.put('/' , authMiddleware ,  async(req,res)=>{
    const body = req.body  ;
    const {success}  = updateBody.safeParse(body) ; 
    if(!success){
        return RegExp.status(411).json({
            message : "invalid inputs"
        })
    }

    await User.updateOne({_id : req.userId} , req.body ) ; 

    res.json({
        message: "Updated successfully"
    })


})


//filter out by last name and first name 
userRouter.get('/bulk' ,  authMiddleware , async(req,res)=>{
    const filter  = req.query.filter|| "" ;


    const users  = await User.find({
        $or : [{
            firstName : {
                "$regex" : filter
            }
        } , {
            lastName :{
                "$regex" :filter 
            }
        }]
    })  ;
    

    return res.json({
        User : users.map(user =>({
        username : user.username ,
        firstName :user.firstName ,
        lastName : user.lastName 
    }))})
})






















module.exports = userRouter ;