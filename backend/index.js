const express = require("express") ; 
const app = express() ; 
const cors  =require("cors") ; // allow frontend to connect with backend 
const mainRouter = require('./routes/index') ; 
app.use(cors()) ; 
app.use(express.json()) ;

app.use("/api/v1" , mainRouter) ;
app.listen(3000, ()=>{
    console.log("Server is running on port 3000");
})  ;