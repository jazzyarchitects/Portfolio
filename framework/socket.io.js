"use strict";

module.exports = (server)=>{
  let io = require('socket.io')(server);
  io.set('transports', ['websocket', 'flashsocket', 'htmlfile', 'xhr-polling', 'jsonp-polling', 'polling']);
  io.set('origins', '*:*');
  io.sockets.on('connection', (socket)=>{
    // console.log("Socket connected");
    socket.on('notification', (data)=>{
      console.log("Socket:"+JSON.stringify(data));
       socket.broadcast.emit('notification', data);
    });
  });
}