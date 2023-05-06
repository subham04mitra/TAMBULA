

const express=require('express');
const app=express();
const route=express.Router();
const home=require('../API/api-route/api_route');
route.use('/tambula',home);
app.use('/',(req,res)=>{
   res.json({Success:false,Message:"No page found"})
    })

  
module.exports=route;
