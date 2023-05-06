const { request } = require('express');
const express = require('express');
const route = express.Router();
const validator=require('../../Middleware/validator');
const verify = require('../../Middleware/authentication');
const control = require('../control/controller');
route.post('/user/login',validator.login, control.ulogin)
route.get('/user/tickets',validator.list,verify,control.getticketlist)
route.post('/user/createticket',validator.create,verify,control.generateTicket)
module.exports = route;











