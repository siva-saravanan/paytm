// user routers all the routes which are coming to user are handlked here 
const express =  require('express') ; 

const z  = require('zod') ; // user validation 
const jwt = require('jsonwebtoken')  ; 
const {User , Account} = require('../db') ;  

const { JWT_SECRET } = require('../config') ; 
const { authMiddleware } = require('../middleware');
const userroute = express.Router() ; // creates route 


const signupSchema  = z.object({
    first_name : z.string().max(50) , 
    last_name  : z.string().max(50) , 
    username  : z.string().max(50).email()  ,
    password   : z.string().min(6) 
})

const siginSchema =  z.object({ 
    username : z.string().max(50).email() ,
    password : z.string().min(8)
})
const updateBody = z.object({
    password : z.string().optional() ,  // these consists of new password and new first name and last name 
    first_name : z.string().max(50).optional(),
    last_name  : z.string().max(50).optional()
})
userroute.post('signup' ,async(req,res) =>{ // this req and res order matters
    const body = req.body  ;
    const {success} = signupSchema.safeParse(body) ;
    //checking whether the validation is correct or not 
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

userroute.post('signin' , async(req,res) =>{
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
    if(existingUser._id==null){
        return res.statusCode(411).send({
            messsage : 'error while logging in'
        })
    }


    //if found na return with jwt token 
    const token  = jwt.sign({
        userId :existingUser._id
    } , JWT_SECRET) ;  
    //initialise their account balance as well

    function randomint( min , max) {
        return Math.floor(Math.random()*(max-min+1))+min; 
    }

    // create an account for the user 
    const userAccount = await Account.create({
        userId  : existingUser_.id  ,
        balance  : randomint(1,10000)   
    })

    return res.statusCode(200).send({
            token : token 
    })

})



//  a new woute for upadating the infos 
userroute.put('/' ,authMiddleware , async (req,res)=>{
        const body  = req.body ; 
        const {success} = updateBody.safeParse(body) ; 
        if(!success){
            res.statusCode(403).json({}) ; 
        }
        const userId = req.userId ; 

// body has correct content 
        

//now update the values in db 

try{
    const newUser = await User.updateOne({_id:userId} , body) ; 
    res.statusCode(200).json({
        message : 'updated successfully'
    })
}
catch{
    res.statusCode(411).json({
        message: "Error while updating information"
    })
}

    })

    userroute.get('/?filter=' , async (req,res)=>{ //after that ? we have to put the queries and using req.query we can use them 
        const filter = req.query.filter||'' ;  // if filter come take that or else takje empty string 

        // now we have to return the users who are all have the filter in their first name or last name 
        // in moongoose we have to use 'or' class for the applying different conditions 
        // and like we have in mysql we in moongosse we have different syntax like regex 

        const users  = await User.find({
            $or : [{  // this is the or query syntax
                first_name : {
                    '$regex' : filter
                }
            } ,
            {
                last_name : {
                    '$regex' : filter
                }
            }]
        })


        //res send
        res.json({
            users  : users.map(user => ({    
                username  : user.username ,
                first_name : user.first_name , 
                last_name : user.last_name ,
                _id : user._id
            }))
        })


    })

module.exports =  {
    user
}
