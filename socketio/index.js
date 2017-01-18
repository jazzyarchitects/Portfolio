"use strict";

module.exports = function (server) {
  var io = require('socket.io')(server);
  io.set('origins', '*:*');
  io.sockets.on('connection', function (socket) {
    setSockets(io, socket);
  });
};

function setSockets(io, socket){

  socket.on('join', (data)=>{
    if(!data || !data.id){
      socket.emit('join-with', generateRandomId());
      return;
    }else{
      socket.join(data.id);
    }
  });


  socket.on('phone-join', (data)=>{
    if(!data || !data.id){
      socket.emit('join-with', generateRandomId(40));
      return;
    }else{

    }
  });


//assign unique ids to all device for communication. use redis for searching and storing

}

const allowed = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890~!@#$%^&*()_+=|][}{:;<>,/?";

function generateRandomId(length){
  length = length || 32;
  let date = (new Date()).getTime();    //epoch time of length 13
  date = date.toString();
  let str = "";
  let str = date;
  for(let i=0;i<(length-date.length);i++){
    let a = Math.random() * allowed.length;
    a = Math.floor(a);
    str += allowed[a];
  }
  return str;
}
