const express = require('express') ; 
const userRouter = require('./user');
const accountRouter =require('./accounts') ; 
const app  = express() ;

/*
By using express.Router(), you can organize your Express app’s routing logic, allowing you to define specific routes and middleware for different parts of
 your application, such as users, products, or orders, in a 
 more maintainable way.
*/
const mainrouter  = express.Router() ; 
app.use('/user' , userRouter) ; 
app.use('/accounts' , accountRouter) ; 

// ths will be our main router for all requests 

// but app.listen will be in main file outside 

module.exports = { 
    mainrouter
}