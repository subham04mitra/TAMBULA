const mongoose = require('mongoose');
const dict = require('./dictionary.json');
let schemas = {};
let schema = mongoose.Schema;

schemas.userSchema = () => {
    let userschema = new schema(dict.user)
    return userschema;
}
schemas.jwtSchema = () => {
    let jwtschema = new schema(dict.jwt)
    return jwtschema;
}
schemas.ticketSchema = () => {
    let ticketschema = new schema(dict.ticket)
    return ticketschema;
}

module.exports = schemas;