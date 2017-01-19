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
     },
     firebase: {
        apiKey: "AAAAWp7yuPM:APA91bEA0iRizU_sH_NxvwiZ8Fo0wVUxBm34WJuDYpkb_6AyeHlIPubHl33_csI8vwZruIz7eR6p5j9TjAyJ-SNdjb2ZTcFOvyOGRY55zhlR6WjLARTajIUuezSMFOnzhkQ99PHni4zz",
        senderID: "389213763827",
        legacyServerKey: "AIzaSyBjCNYzs5hWVrUNRF7ipbeUjBQ1QQeqyT4"
     }
 };
