const express=require('express');
const dotenv=require('dotenv')
dotenv.config();
const bodyparser=require('body-parser');
const port=process.env.PORT;
const cors=require('cors');

const app=express();
app.use(cors())
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}));
app.use(cors())
const route=require('./Route/route');
app.use('/',route);
app.listen(port,(err)=>{
if(err){
console.log("Server Error");
}
console.log(`Server started at port ${port}.....`);
})