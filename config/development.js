"use strict";

 let path = require('path');
 let rootPath = path.join(__dirname, "..");

 module.exports = {
     root: rootPath,
     db: {
          uri: "mongodb://127.0.0.1/Portfolio",
          options: {
             server: {
                socketOptions: {
                     keepAlive: 1
                 }
             }
         }
     },
     server: {
         port: Number(process.env.PORT || 3000)
     },
     secret: {
        jwt: "F398M*GwK6q8FfEEO%Kx"
     }
 };
