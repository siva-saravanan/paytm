const mongoose = require('mongoose') ; 


mongoose.connect('mongodb://localhost:27017/paytm') ;



// create the user schema 
const userSchema  =new mongoose.Schema({
    first_name : {
        type: String , 
        maxLength : 50 , 
        required :true, 
     } ,
     last_name : {
        type: String , 
        maxLength : 50 , 
        required :true, 
     } ,
     username : {
        type: String , 
        maxLength : 50 , 
        required :true, 
        unique: true ,
        lowercase : true 
     } ,
     password : {
        type: String , 
        minLength : 6 , 
        required :true, 
        uniquec : true  
     } 
})  ; 

// user model or datbase 
const User = mongoose.model('User' ,  userSchema) ; 
// for banking schema 
// why we had ref means we don't to have an account and balance who don't even have the 
// bank account so this allows only the guys whi have the bank account 
const AccountSchema  = mongoose.Schema({
   userId : {
      type : mongoose.Schema.Types.ObjectId ,  
      ref : 'User' , 
      required  : true
   } , 
   balance :  {
      type : number  , 
      required : true 
   }
})






const Account  = mongoose.model('Account' ,  AccountSchema)


module.exports = {
    User , Account
} ;  