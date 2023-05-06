const jwt = require("jsonwebtoken");
const sch = require('../Table/schema')
const mongoose = require('mongoose');
function connect() {
    const url = process.env.URL;
    const connection = mongoose.createConnection(url,
        { useNewUrlParser: true, useUnifiedTopology: true })
    return connection;
}
let operation = {};
operation.ulogIn = async (data) => {
    return new Promise(async (resolve, reject) => {
        let conn = connect();
        let coll = conn.useDb(process.env.DB_NAME);
        let userModel = coll.model("users", sch.userSchema());
        const user = await userModel.find({ userid: data.userid, password: data.password },{_id:0});
        if (user.length != 0) {
            let coll1 = conn.useDb(process.env.DB_NAME);
            let jwtModel = coll1.model("jwts", sch.jwtSchema());
            let jwtData = {
                id: user[0].userid,
                
                Built_Time: new Date()
            }
            let token = jwt.sign(jwtData, process.env.SECRET_KEY,{expiresIn:"1h"}); 
            await jwtModel.insertMany({ Token: token, userid: user[0].userid, Built_Time: new Date(), Logout: false })
            conn.close();
            resolve({ Success: true, Message: "Login Successfull", Token: token,Data:user })
        }
        reject({ Success: false, Message: "No User Found" })
    });
};
operation.ticketList=async(page,limit,user)=>{
    return new Promise(async(resolve,reject)=>{    
        console.log("decode............",user);
        let conn = connect();
        let coll = conn.useDb('Tambula');
        let userModel = coll.model("tickets", sch.ticketSchema());
        let skipElements=page!=undefined?(page-1)*limit:0;
        let limitTo=limit!=undefined?limit:20;
        let userData=await userModel.find({userid:user.id},{_id:0,},{ skip: skipElements, limit: limitTo });
        console.log(userData);
        conn.close();
        if(userData.length!=0){
            resolve({Success:true,data:userData,pagination:{
                page:page!=undefined?page:1,limit:limit!=undefined?limit:20
            }})
        }
        else{
            reject({Success:false,Message:"DB operation failed"})
        }
    })
}
operation.createTambulaTicket=async(user,ticketNo)=>{
    return new Promise(async(resolve,reject)=>{    
        try{
            if(ticketNo.tickets<=6){
                 let conn = connect();
        let coll = conn.useDb(process.env.DB_NAME);
        let userModel = coll.model("tickets", sch.ticketSchema());
        function tambulaGenerator(n) {
            let res = [];
            while (n > 0) {
                const ROWS = 3;
                const COLUMNS = 9;
                const MAX_NON_ZERO_NUMBERS = 5;
                let ticket = [];
                for (let i = 0; i < ROWS; i++) {
                    let row = [];
                    let nonZeroCount = 0;
                    while (nonZeroCount < MAX_NON_ZERO_NUMBERS) {
                        let columnIndex = Math.floor(Math.random() * COLUMNS);
                        if (row[columnIndex]) {
                            continue;
                        }                     
                        let number = Math.floor(Math.random() * 90) + 1;
        
                        row[columnIndex] = number;
                        nonZeroCount++;
                    }
                    for (let j = 0; j < COLUMNS; j++) {
                        if (!row[j]) {
                            row[j] = 0;
                        }
                    }
                    ticket.push(row);
                }
                res.push(ticket)
                n--;
            }
            return res;
        }
        let tambulaTicket=tambulaGenerator(ticketNo.tickets);
       let ticketObj={
            userid:user.id,
            tickets:tambulaTicket
        }
        let ticketData=await userModel.insertMany(ticketObj);
        conn.close();
        if (ticketData.length!=0){
            resolve({Success:true, Message:`${ticketNo.tickets} ticket generated`,data:{
                "userid":user.id
            }})
        }
        else{
            reject({Success:false,Message:"DB operation failed"})
        }
            }
            else{
                reject({Success:false,Message:"Ticket Limit Exceeded"})
            }
           
        }catch(e){reject({Success:false,Message:"Something went wrong"})
            
        }
        
    })
}
module.exports = operation;

