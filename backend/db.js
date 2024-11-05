const { default: mongoose } = require('mongoose');
const moongoose = require('mongoose') ;
const { boolean, number } = require('zod');

moongoose.connect('mongodb://localhost:27017/paytm') ;

const userSchema  = new moongoose.Schema({
    username : {
        type : String , 
        required : true  , 
        unique : true  ,
        minLength : 3 ,
        maxLength :  50 ,
        lowercase :true , 
        trim  : true 
    } , 
    password : {
        type : String  , 
        required : true  ,
        minLength : 8 ,
        maxLength : 50 , 
    } ,
    firstName  : {
        type : String , 
        required : true  , 
        unique : true  ,
        minLength : 3 ,
        maxLength :  50 ,
        lowercase :true , 
        trim  : true 
 }
 ,  lastName  : {
        type : String , 
            required : true  , 
            unique : true  ,
            minLength : 3 ,
            maxLength :  50 ,
            lowercase :true , 
            trim  : true 
 }
})

const User = mongoose.model('User' , userSchema) ; 

const accountSchema = new mongoose.Schema({
    userId : {
        type : moongoose.Schema.Types.ObjectId , 
        ref : 'User' ,
        required :true
    } , 
    balance : {
        type : Number ,
        required : true
    }
})

const Accounts =  moongoose.model('Accounts' , accountSchema) ; 
module.exports = {
    User , Accounts
}