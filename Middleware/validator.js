let validator={}
validator.login=(req,res,next)=>{
    let bodyData=req.body;
    let userid=bodyData.userid;
    let password=bodyData.password;
    if(typeof userid=='string' && typeof password=='string'){
        next()
    }
    else{
        res.send({Succes:false,Error:"Wrong Input Data Format"})
    }
}
validator.list=(req,res,next)=>{
    
    let page=req.query.page;
    let limit=req.query.limit;
    if(typeof +(page)=='number' && typeof +(limit)=='number'){
        next()
    }
    else{
        res.send({Succes:false,Error:"Wrong Input Data Format"})
    }
}
validator.create=(req,res,next)=>{
    let bodyData=req.body;
    let tickets=bodyData.tickets;

    if(typeof tickets=='string'){
        if(typeof +(tickets)=='number'){
            next()
        }
        else{
            res.send({Succes:false,Error:"Wrong Input Data Format"})
        }
    }
    else{
        res.send({Succes:false,Error:"Wrong Input Data Format"})
    }
}
module.exports = validator;