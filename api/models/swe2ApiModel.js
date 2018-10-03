'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var HeartbeatSchema = new Schema({
  name: {
    type: String,
    required: 'Heartbeat'
  },
  Created_date: {
    type: Date,
    default: Date.now
  },
  status: {
    type: [{
      type: String,
      enum: ['pending', 'Alive', 'Dead']
    }],
    default: ['pending']
  }
});

module.exports = mongoose.model('Heartbeats', HeartbeatSchema);