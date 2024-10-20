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
        unique: true 
     } ,
     password : {
        type: String , 
        minLength : 6 , 
        required :true, 
        uniquec : true  
     } 
})  ; 

// user model or datbase 
const User = userSchema.model('User' ,  userSchema) ; 


module.exports = {
    User
} ;  