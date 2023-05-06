const jwt = require("jsonwebtoken");
const mongoose = require('mongoose')
const sch = require('../Table/schema');
function connect() {
    const url = process.env.URL;
    const connection = mongoose.createConnection(url,
        { useNewUrlParser: true, useUnifiedTopology: true })
    return connection;
}
async function verify(req, res, next) {
    let token = req.headers.token;
    // console.log("auth token",token);
    try {
        let decode = jwt.verify(token, "SECRETKEY");
        req.decode=decode;
        let conn = connect();
        let coll = conn.useDb('Tambula')
        let jwtModel = coll.model("jwts", sch.jwtSchema())
        let validtoken = await jwtModel.find({ Token: token });
        conn.close();
        if (decode.Name === validtoken[0].Name) {
            if (validtoken[0].Logout == false) {
                // console.log("to next");
                next();
            }
            else {
                res.json({ Success: false, Message: "Already Logout" })
            }
        }
    } catch (err) {
        // console.log(token);
        res.json({ Success: false, Message: err })
    }
}
module.exports = verify;