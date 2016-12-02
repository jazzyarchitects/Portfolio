"use strict";

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var modelSchema = new Schema({
  "name": {
    "type": String
  },
  "email": {
    "type": String
  },
  "subject": {
    "type": String
  },
  "message": {
    "type": String
  }
});

mongoose.model("Contact", modelSchema);
