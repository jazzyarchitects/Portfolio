"use strict";

let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let modelSchema = new Schema({
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
  },
  "contactedOn": {
    type: Schema.Types.Date,
    default: Date.now
  }
});

mongoose.model("Contact", modelSchema);
