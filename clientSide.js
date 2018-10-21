var express = require('express');
var router = express.Router({});
var mongoose = require('mongoose');
mongoose.connect('localhost/swe2');
var Schema = mongoose.Schema;

var AssetManager = require('../models/hearbeatModel');
var Diagnostic = require('../models/diagnosticModel'); 
var User = require('../models/userModel'); 

/* GET gateway listing. */
router.get('/', function (req, res) {
    AssetManager.find()
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

});


router.post('/users/login', function(req, res) {
     var email = req.body.email;
     var password = req.body.password;
     var userName = req.body.userName;
     var data;
    if (email.length > 0 && password.length > 0) {
         data = {
             email: email,
             password: password
         };
    }
    else if(username.length > 0 && password.length > 0) {
         data = {
             username: username,
             password: password
         };
    } 
    else {
         res.json({
             status: 0,
             message: err
         });
    }


    User.findOne(data, function(err, user) {
        if (err) {
             res.json({
                 status: 0,
                 message: err
             });
        }
        else if (!user) {
             res.json({
                 status: 0,
                 msg: "not found"
             });
         }
        else if (user){
            res.json({
                status: 1,
                id: user._id,
                message: " success"
            });
        }
     
        else {
            res.json({
                status: 0,
                msg: "Invalid Fields"
            });
        }
    });
});

router.get("/:GatewayId", (req, res, next) => {
  const id = req.params.GatewayId;
  var query = {GatewayId: id}
  AssetManager.find(query)
    .exec()
    .then(doc => {
      console.log("From database", doc);
      if (doc) {
        res.status(200).json(doc);
      } else {
        res
          .status(404)
          .json({ message: "No valid entry found for provided ID" });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

router.put('/', function (req, res) {
    res.status(202).json({
        "Status": "put ok"
    });
    //res.status(202).send();
});

router.get("/onDemand/:GatewayId", (req, res, next) => {
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

});


router.put('/', function (req, res) {
    res.status(202).json({
        "Status": "put ok"
    });
    //res.status(202).send();
});



router.post('/', function (req, res) {

    var ODDTest = new Diagnostic({
        ODD: req.body.ODD,
        GatewayId: req.body.GatewayId,
  
    });

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
});
router.post('/user', function (req, res) {

    var newUser = new User({
        email: req.body.email,
        userName: req.body.userName,
        password: req.body.password,
  
    });

    newUser    
        .save()
        .then(result => {
            console.log(result);
            res.status(201).json({
                Users: result,
                message: "POST Success" 
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});



router.delete("/:GatewayId", (req, res, next) => {
  const id = req.params.GatewayId;
  AssetManager.remove({ _id: id })
    .exec()
    .then(result => {
        console.log("Heartbeat deleted");
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
