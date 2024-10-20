const express = require("express");
const mainrouter  =require('./routes/routes') ; 
const app =express() ;  
const cors = require('cors') ; 

app.use(cors()) ; // allows all the links to hit the backend 
app.use(express.json()) ; // body-parser to read the infos from the json object 
app.use('api/v1' , mainrouter)  ;


app.listen(3000) ; 

