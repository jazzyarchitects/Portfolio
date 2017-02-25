"use strict";

module.exports = (server)=>{
  let io = require('socket.io')(server);
  io.sockets.on('connection', (socket)=>{
    socket.on('notification', (data)=>{
      console.log("Socket:"+JSON.stringify(data));
      socket.broadcast.emit('notification', data);
    });
  });
}