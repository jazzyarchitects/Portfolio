"use strict";

const express = require('express');
const router = express.Router();
const path = require('path');

const fcm = require(path.join(__dirname, '..', '..', 'framework', 'firebase'));

router.post('/linuxStartup', function(req, res){
  console.log("Sending linux startup notification");
  if(req.body.to === undefined || req.body.to === ""){
    res.send("No fcm id provided");
    return;
  }
  fcm.sendMessage(req.body.to, req.body.startTime, function(err, response, body){
    res.send(body);
  });
});

module.exports = (app)=>{
  app.use('/apps', router);
}