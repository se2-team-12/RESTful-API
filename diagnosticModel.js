'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var DiagnosticSchema = new Schema({
    ODD: String,
    GatewayId : String,
    Type: String,
    Result: String,
    IsClear: Boolean,

});

module.exports = mongoose.model('ODD', DiagnosticSchema);
