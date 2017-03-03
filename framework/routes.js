"use strict";

let fs = require('fs');
let path = require('path');
let express = require('express');

module.exports = function(app) {
  let router = express.Router();

  let moduleDirectory = path.join(__dirname, '..', "./modules");
  fs.readdirSync(moduleDirectory).forEach(function(model) {
    if(model !== "apps"){


      let routesPath = path.join(moduleDirectory, model, 'routes.js');
      let stats = fs.statSync(path.join(moduleDirectory, model));
      if(!stats.isDirectory()) {
        return;
      }
      if(fs.existsSync(routesPath)) {
        require(routesPath)(router);
      }
      let routesFolder = path.join(moduleDirectory, model, "routes");
      if(fs.existsSync(routesFolder)) {
        fs.readdirSync(routesFolder).forEach(function(file) {
          let st = fs.statSync(path.join(routesFolder, file));
          if(st.isFile()) {
            require(path.join(routesFolder, file))(router);
          }
        });
      }
    }
  });

  app.use('/api', router);

  require(path.join(__dirname, '..', 'modules', 'apps', 'routes'))(app);

  app.all('/cv', function(req, res){
    res.redirect('https://drive.google.com/file/d/0B1cWZGp8N63McEpWQXNDSlhYNFE/view?usp=sharing');
  });

  app.all('/medical-assistant/privacy-policy', function(req, res){
    res.sendFile(path.join(__dirname, '..', 'public', 'privacypolicy.htm'));
  });

  app.use((req, res)=>{
    res.redirect('/');
  });
}
