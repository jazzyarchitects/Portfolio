"use strict";

const path = require('path');
const request = require('request');

const FCM_URL = "https://fcm.googleapis.com/fcm/send";


let sendMessage = function(recipients, data, isHaptiq, __cb){
  if(!recipients){
    recipients = "dhfbskjfnsdk";
  }

  if(typeof(isHaptiq)==="function"){
    __cb = isHaptiq;
    isHaptiq = false;
  }

  let key = "AAAA7_Lgai8:APA91bHNXoXYcaQTmccqlfvj5TBPpEP7GR9xvEy76m1Z5kSz1CVb-Ych-iDCUkEazDZGawnbNHaJPVmiiph8-4yhO1-6CkVUJ_qAh7ArbGhkFQBUgvaCeUw-YIyXp-cwRtuA2lYQF2M5";

  if(isHaptiq){
    key = "AAAAIp9DcdA:APA91bEmSer9HJEADyJqkiTfaeKmzn-kz5ydk08wy8MGjSoBbKZJrBoqE-Dxf9-07jt4YH_0zIPzJfFarUnXxta9pGAi4yxPKlNPtCdqocd7QZHDKttIyyFJrtUTCbJ5tNsCXR5NSzUV";
  }

  if(!Array.isArray(recipients)){
    recipients = [recipients];
  }

  request({
    method: 'POST',
    uri: FCM_URL,
    headers: {
      'Authorization': "key="+key
    },
    json: {
      "registration_ids": recipients,
      'priority': 'high',
      'data': data

    }
  }, (err, response, body)=>{
    if(__cb){
      __cb(err, response, body);
    }
    // Log.i("Firebase: "+)o
    // console.log(response.statusCode);
    // console.log(body);
  });
}

if(require.main === module){
  sendMessage();

}

exports.sendMessage = sendMessage;
