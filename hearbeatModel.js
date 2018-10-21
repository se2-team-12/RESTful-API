'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var HeartbeatSchema = new Schema({
    GatewayId : String,
    TimeStamp: String,

 
});

module.exports = mongoose.model('Heartbeat', HeartbeatSchema);