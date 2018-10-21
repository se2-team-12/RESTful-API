var express = require('express');
var router = express.Router({});
var mongoose = require('mongoose');
mongoose.connect('localhost/swe2');
var Schema = mongoose.Schema;

var Gateway = require('../models/hearbeatModel');
var Diagnostic = require('../models/diagnosticModel'); 



/* GET gateway listing. */
router.get("/:GatewayId", (req, res, next) => {
    var token = req.headers['accesstoken'];
        if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });
  
    if (token == "hello"){
    const id = req.params.GatewayId;
    var query = {GatewayId: id}

    Diagnostic.find(query)
        .exec()
        .then(docs =>{
            console.log(docs);
            res.status(200).json(docs);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
    }
    else{
        return res.status(401).send({ auth: false, message: 'Invalid Token.' });
    }
    

});

//Posting a heartbeat and recieving diagnostics
router.post('/heartbeat/:GatewayId', function (req, res) {
    const id = req.params.GatewayId;
    var query = {GatewayId: id}
    var token = req.headers['accesstoken'];
        if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });
  
    if (token == "hello"){

    var test = "";
    Diagnostic.find(query)
        .exec()
        .then(docs =>{
            console.log(docs);
            test = docs;
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
        var heartbeat = new Gateway({
        GatewayId: req.body.GatewayId,
        TimeStamp: req.body.TimeStamp,
    });

    heartbeat
        .save()
        .then(result => {
            console.log(result);

            res.status(201).json({
                postedHeartbeat: result,
                odd: test,
                message: "Success" 
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
    }
    else{
        return res.status(401).send({ auth: false, message: 'Invalid Token.' });
    }
   
});
//Post a diagnostic test
router.post('/diagnostic/test', function (req, res) {

    var ODDTest = new Diagnostic({
        ODD: req.body.ODDType,
        GatewayId: req.body.GatewayId,
        Type: req.body.Type,
        Result: req.body.Result,
        IsClear: req.body.IsClear,
  
    });
    var token = req.headers['accesstoken'];
        if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });
  
    if (token == "hello"){

    ODDTest
        .save()
        .then(result => {
            console.log(result);
            res.status(201).json({
                Diagnostic: result,
                message: "POST Success" 
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
    }
    else{
        return res.status(401).send({ auth: false, message: 'Invalid Token.' });
    }
});

router.put('/', function (req, res) {
        var gateway = new Gateway({
        GatewayId: req.body.GatewayId,
        TimeStamp: req.body.TimeStamp,
        status: req.body.status
    });
  gateway
  .findOneAndUpdate({_id: req.params.GatewayId}, req.body, {new: true}, function(err, heartbeat) {
    if (err)
      res.send(err);
    res.json(heartbeat);
  });

});

router.delete('/', function (req, res) {
        var gateway = new Gateway({
        GatewayId: req.body.GatewayId,
        TimeStamp: req.body.TimeStamp,
        status: req.body.status
    });
  gateway.remove({
    _id: req.params.GatewayId
  }, function(err, heartbeat) {
    if (err)
      res.send(err);
    res.json({ message: 'Heartbeat successfully deleted' });
  });
    //res.status(202).send();
    process.exit();
});

router.patch("/:GatewayId", (req, res, next) => {
  const id = req.params.GatewayId;
  const updateOps = {};
  for (const ops of Object.keys(updateOps)) {
    updateOps[ops.propName] = ops.value;
  }
  Diagnostic.update({ _id: id }, { $set: updateOps })
    .exec()
    .then(result => {
      console.log(result);
      res.status(200).json(result);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

router.options('/', function (req, res) {
    res.header('Allow', 'GET, POST, PUT, PATCH, DELETE, OPTIONS, HEAD').status(204).send();
});

module.exports = router;
