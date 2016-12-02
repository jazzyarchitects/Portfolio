"use strict";

const nodemailer = require('nodemailer');
let user = "jibinmathews7@gmail.com";
let password = process.env.PORTFOLIO_NODEMAILER_PASSWORD;
if(password===undefined){
  throw new Error("Please define password for NodeMailer in PORTFOLIO_NODEMAILER_PASSWORD environment variable");
}
let transporter = nodemailer.createTransport('smtps://'+user+':'+password+'@smtp.gmail.com');

let notify = function(response){
  let message = "Hello,<br / ><b>"+response.name+"</b> tried to contact you via your PORTFOLIO.<br />With the following details:";
  message += "<b>Subject:</b>    "+response.subject+"<br />";
  message += "<b>Messgae:</b>    "+response.message+"<br /><br />";
  message += "<b>Reply at: </b>  "+response.email;


  let mailOptions = {
    from: '"Jibin Mathews" <jibinmathews7@gmail.com>',
    to: 'jibinmathews7@gmail.com',
    subject: "Some contacted you via Portfolio",
    text: message,
    html: message
  };

  transporter.sendMail(mailOptions, function(error, info){
    if(error){
      console.log(chalk.yellow("------------------Error sending notification----------------"));
      return console.log(error);
    }
    console.log(chalk.green('Message sent: ' + info.response));
  });

};

exports.notify = notify;
