"use strict";

let offlinePairingDeleted = [];

let chromeSocketIdMap = {};
let chromeFcmMap = {};

module.exports = (server)=>{
  const firebase = require('./firebase');
  let io = require('socket.io')(server);
  io.set('transports', ['websocket', 'flashsocket', 'htmlfile', 'xhr-polling', 'jsonp-polling', 'polling']);
  io.set('origins', '*:*');
  io.sockets.on('connection', (socket)=>{

    // Generate Unique ID for chrome extension. If already exists, then join the room
    socket.on('join', (data)=>{
      console.log("join: "+JSON.stringify(data));;
      if(!data || !data.id){
        socket.emit('join-with', generateRandomId());
        return;
      }else{
      // data.id stores the id of chrome-extension which was assigned on first connect
      socket.join(data.id);
      if(offlinePairingDeleted.indexOf(data.id)!==-1){
        io.in(data.id).emit('deletePairing', {});
      }
      chromeSocketIdMap[socket.id] = data.id;
    }
  });

  // Generate Unique ID for mobile application. If already exists, then join the room
  socket.on('phone-join', (data)=>{
    console.log("phone-join: "+JSON.stringify(data));
    if(!data || !data.id){
      socket.emit('join-with', generateRandomId(40));
      return;
    }else{
      // data.id stores the id of phone which was assigned on first connect
      socket.join(data.id);
    }
  });

  socket.on('pairing', (data)=>{
    console.log("pairing: "+JSON.stringify(data));;
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
    console.log("deletePairing: "+JSON.stringify(data));;
    if(!data.fcm && data.chromeId){

      io.in(data.chromeId).emit('deletePairing', {});
      offlinePairingDeleted.push(data.chromeId);
    }else if(data.fcm && !data.chromeId){
      firebase.sendMessage(data.fcm, {
        pairing: "deletePairing"
      });
    }
  });

  socket.on('deletePairing-ack', (data)=>{
    console.log("deletePairing-ack: "+JSON.stringify(data));;
    let index = offlinePairingDeleted.indexOf(data.chromeId);
    offlinePairingDeleted.splice(index,1);
  });

  socket.on("pairing-successful", (data)=>{
    console.log("pairing-successful: "+JSON.stringify(data));;
    io.in(data.phoneId).emit('pairing-successful', data);
  });

  socket.on('notification', (data)=>{
    console.log("notification:"+JSON.stringify(data));
    io.in(data.chromeId).emit('notification', data);
  });

  socket.on('chrome-stopped', (data)=>{
    console.log("chrome-stopped: "+JSON.stringify(data));
    firebase.sendMessage(data.fcm, {event: "chrome-stopped"});
    if(chromeSocketIdMap[socket.id]){
      chromeFcmMap[chromeSocketIdMap[socket.id]] = undefined;
      chromeSocketIdMap[socket.id] = undefined;
    }
  });

  socket.on('disconnect', (data)=>{
    console.log("Disconnect: "+JSON.stringify(data));
    if(chromeSocketIdMap[socket.id]){
      firebase.sendMessage(chromeFcmMap[chromeSocketIdMap[socket.id]], {event: "chrome-stopped"});
      chromeFcmMap[chromeSocketIdMap[socket.id]] = undefined;
      chromeSocketIdMap[socket.id] = undefined;
    }
  });

  socket.on('fcm-map', (data)=>{
    console.log("FCM Map: "+JSON.stringify(data));
    if(data.chromeId){
      chromeFcmMap[data.chromeId] = data.fcm;
    }
  });


  socket.on('browser-authentication', (data)=>{
    io.in(data.chromeId).emit('browser-authentication', data); 
  });

  socket.on('request-browser-authentication', (data)=>{
    firebase.sendMessage(data.fcm, {type: 'browser-authentication'}, true);
  });

  

  socket.on('initiate-authentication', (data)=>{
    firebase.sendMessage(data.fcm, {
      url: data.url,
      type: data.type || 'login',
      chromeId: data.chromeId
    }, true);
  });

  socket.on('mobile-authenticated', (data)=>{
    io.in(data.chromeId).emit('mobile-authentication', {
      userid: data.userId,
      password: data.password,
      key: data.key
    });
  });

  socket.on('chrome-authentication', (data)=>{
    io.in(data.phoneId).emit('chrome-authentication', {
      success: data.success,
      url: data.url,
      otpRequired: data.otpRequired || false
    });
  });

  socket.on('phone-otp', (data)=>{
    io.in(data.chromeId).emit('otp', {
      otp: data.otp
    });
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
