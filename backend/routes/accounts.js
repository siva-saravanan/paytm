 //all the account related requests will come here 

 const express =  require('express') ; 
const { Account } = require('../db');
 const z = require('zod') ;  
const { authMiddleware } = require('../middleware');
const { default: mongoose } = require('mongoose');
 const accountRouter  = express.Router()  ; 

const transferSchema  = z.object({
    to : z.string() , 
    amount  : z.number()
})
 // to get the acccount balance of the user 

 accountRouter.get('/balance' ,authMiddleware , async (req, res)=>{
    const body  = req.body  ; 
    // check for the balance in the accounts db 
    const accountdetails   = await Account.findOne({userId : body.userId} )  ; 
    const balance = accountdetails.balance ; 
    res.statusCode(200).json({
        balance: balance
    })
})

// endpoint to tansfer  the money to other 
/*
Body
{
	to: string, - > username 
	amount: number
}*/


accountRouter.put('/transfer'  ,authMiddleware,async (req,res) =>{
    const {to ,amount }  = req.body ;
   // const receiverDetails = await User.findOne({username :to})  ;
    //const receiverID  = receiverDetails.userId  ; 
    // zod validation 
    const session =mongoose.startSession();
    const {success}  = transferSchema.safeParse(req.body)  ;
    if(!success){
        (await session).abortTransaction();
        res.statusCode(400).json({
            message  : "invalid input"
        })
    }
    //check whether the to account exist or not 
    const recAccount  = await Account.findOne({userId :  to}).session(session) ; 
    if(recAccount == null){
        (await session).abortTransaction();
        res.statusCode(400).json({
            
            message: "Invalid account"
        })
    }
    
    // check the bank balance of the user who is sending the money 

  
    const senderDetails  = await Account.findOne({userId :req.userId}).session(session) ;  
    const senderBalance  = senderDetails.balance ; 

    // check insufficient balance 
    if(senderBalance < amount){
        (await session).abortTransaction();
        res.statusCode(400).json({
            message: "Insufficient balance"
        })
    }


    // now if both checks are done both accounts exist and i has sufficient funds then do transfer 
    await Account.updateOne({userId : userId } , {$inc : {balance : -amount}}) ; 
    await Account.updateOne({userId : to} ,{$inc : {balance : -amount}}) ; // $inc increase the balance with +/- with amount
    
    
    (await session).commitTransaction() ;
    res.statusCode(200).json({
        message: "Transfer successful"
    });
    
    



})







 module.exports = {
    accountRouter
 }