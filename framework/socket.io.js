"use strict";

let offlinePairingDeleted = [];

module.exports = (server)=>{
  const firebase = require('./firebase');
  let io = require('socket.io')(server);
  io.set('transports', ['websocket', 'flashsocket', 'htmlfile', 'xhr-polling', 'jsonp-polling', 'polling']);
  io.set('origins', '*:*');
  io.sockets.on('connection', (socket)=>{

    // Generate Unique ID for chrome extension. If already exists, then join the room
    socket.on('join', (data)=>{
      if(!data || !data.id){
        socket.emit('join-with', generateRandomId());
        return;
      }else{
      // data.id stores the id of chrome-extension which was assigned on first connect
      socket.join(data.id);
      if(offlinePairingDeleted.indexOf(data.id)!==-1){
        io.in(data.id).emit('deletePairing', {});
      }
    }
  });

  // Generate Unique ID for mobile application. If already exists, then join the room
  socket.on('phone-join', (data)=>{
    if(!data || !data.id){
      socket.emit('join-with', generateRandomId(40));
      return;
    }else{
      // data.id stores the id of phone which was assigned on first connect
      socket.join(data.id);
    }
  });

  socket.on('pairing', (data)=>{
    // data.chromeId is the id of chrome extension
    // data.phoneId is the id of mobile phone
    // data.fcmId is the FCM registration id of mobile phone

    // Send to chrome extension with which pairing is being done. Make chrome store phoneId and fcm
    io.in(data.chromeId).emit('pairing', {
      chromeId: data.chromeId,
      phoneId: data.phoneId,
      fcm: data.fcmId,
      secretKey: data.secretKey
    });

  });

  socket.on('deletePairing', (data)=>{
    if(!data.fcm && data.chromeId){
      if(io.sockets.adapter.sids[socket.id][data.chromeId]){
        io.in(data.chromeId).emit('deletePairing', {});
      }else{
        offlinePairingDeleted.push(chromeId);
      }
    }else if(data.fcm && !data.chromeId){
      firebase.sendMessage(data.fcm, {
        pairing: "deletePairing"
      });
    }
  });

  socket.on("pairing-successful", (data)=>{
    io.in(data.phoneId).emit('pairing-successful', data);
  });

  socket.on('notification', (data)=>{
    console.log("Socket:"+JSON.stringify(data));
    io.in(data.chromeId).emit('notification', data);
  });

});
}

const allowed = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890~!@#$%^&*()_+=|][}{:;<>,/?";

function generateRandomId(length){
  length = length || 32;
  let date = (new Date()).getTime();    //epoch time of length 13
  date = date.toString();
  let str = date;
  for(let i=0;i<(length-date.length);i++){
    let a = Math.random() * allowed.length;
    a = Math.floor(a);
    str += allowed[a];
  }
  return str;
}
