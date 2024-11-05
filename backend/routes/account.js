const express =require('express') ; 
const authMiddleware = require('../middleware');
const { Accounts } = require('../db');
const {  default: mongoose } = require('mongoose');
const accountRouter  = express.Router() ; 
accountRouter.get('/balance' ,authMiddleware , async (req,res)=>{
    const userId = req.userId ; 

    const details  = await Accounts.findOne({userId : userId}) ;
    return res.status(200).json({
        balance : details.balance 
    })

})

accountRouter.post('/transfer' , authMiddleware , async(req,res) =>{
    

    const session = await mongoose.startSession() ; 
     session.startTransaction() ; 
     const userId = req.userId ;
    const to = req.body.to ;
    const amount  = req.body.amount ; 
    // validate rec details and sender's balance 
    const sender  =await Accounts.findOne({userId :userId}).session(session)  ;
    if(!sender || sender.balance < amount){
        (await session).abortTransaction() ; 
        return res.status(400).json({
            message: "Insufficient balance"
        }) ; 
    }

    const receiver  = await Accounts.findOne({userId :to }).session(session) ; 
    if(!receiver){
        (await session).abortTransaction() ; 
        return res.status(400).json({
            message: "Invalid account"
        }) ;
    }


    await Accounts.updateOne({userId : userId} , {$inc : {balance  : -amount}}).session(session);
    await Accounts.updateOne({userId : to} , {$inc : {balance  : amount}}).session(session);


    session.commitTransaction() ;
    (await session).endSession()  ;
    res.json({
        message: "Transfer successful"
    });

})




module.exports = accountRouter ; 