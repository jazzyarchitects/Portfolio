'use strict';

let express = require('express');
let path = require('path');
let fs = require('fs');
let morgan = require('morgan');
let cookieParser = require('cookie-parser');
let bodyParser = require('body-parser');
let errorHandler = require('errorhandler');
let compression = require('compression');
let chalk = require('chalk');


module.exports = function(app) {
    // Prettify HTML
    app.locals.pretty = true;

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));

    app.use(compression({
        // Levels are specified in a range of 0 to 9, where-as 0 is
        // no compression and 9 is best compression, but slowest
        level: 9
    }));

    // Only use logger for development environment
    if (process.env.NODE_ENV === 'development' || !process.env.NODE_ENV) {
        app.use(morgan('dev'));
    }

    // set .html as the default extension
    app.set('view engine', 'html');

    // Enable jsonp
    app.enable('jsonp callback');

    // The cookieParser should be above session
    app.use(cookieParser());


    // Request body parsing middleware should be above methodOverride
    app.use(bodyParser());

    app.use(function(req, res, next) {
        res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
        res.header('Expires', '-1');
        res.header('Pragma', 'no-cache');
        next()
    });
    app.use(express.static(path.join(__dirname, '..', 'public')));
    app.all('/', (req, res)=>{
        fs.readFile(path.join(__dirname, '..', 'public', 'index.html'), function(err, buf) {
            if(err) {
                return res.end("Some Error");
            }
            res.set('Content-Type', 'text/html');
            res.send(buf.toString());
        });
    });

    // Error handler
    if (process.env.NODE_ENV === 'development' || !process.env.NODE_ENV) {
        app.use(errorHandler());
        app.get('/routes', (req, res, next)=>{
            res.sendFile(path.join(__dirname, "..", "tmp", "routes.html"));
        });
    }

    let len = "App is now live!".length;
    let col = process.stdout.columns?process.stdout.columns:40;
    let starCount = (col-len)/2-1;
    let str = "";
    for(let i = 0; i<starCount; i++) {
        str+="*";
    }
    console.log(chalk.bgBlue.white(str+"App is now live!"+str));
};
