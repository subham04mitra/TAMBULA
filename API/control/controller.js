const express = require('express');

const db = require('../../Service/dboperation');

let service = {};
service.ulogin = async (req, res) => {
    let data = req.body;
    try {
        let response = await db.ulogIn(data);
        if (response) {
            res.json(response);
        }
    } catch (err) {
        res.json({ err })
    }
}

 service.getticketlist = async (req, res) => {
    let page=req.query.page;
    let user=req.decode;
    let limit=req.query.limit;
     try {
         let response = await db.ticketList(page,limit,user);
         if (response) {
             res.json(response);
         }
     } catch (err) {
         res.json(err)
     }
 }
 service.generateTicket = async (req, res) => {
    let user=req.decode;
    let ticketNo=req.body;
     try {
         let response = await db.createTambulaTicket(user,ticketNo);
         if (response) {
             res.json(response);
         }
     } catch (err) {
         res.json(err)
     }
 }


module.exports = service;