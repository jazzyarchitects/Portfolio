"use strict";
let express = require('express');
let router = express.Router();
let controller = require('./controller');


router.get('/', function(req, res) {
    controller.get(req, res);
});

router.get('/:id', function(req, res) {
  controller.get(req, res);
});

router.put('/:id', function(req, res) {
  controller.update(req, res);
});

router.post('/', function(req, res) {
  controller.create(req, res);
});

router.delete('/:id', function(req, res) {
  controller.remove(req, res);
});

printRoutes(router, 'contactRoutes.json', false);
module.exports = function(app) {
    app.use('/contact', router);
};

