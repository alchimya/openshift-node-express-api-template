/**
 * Created by domenicovacchiano on 17/05/15.
 */

//REST implementation

var express = require('express'),
    errorResponse = require('./../modules/error-response'),
    errorDomain= require('./../modules/error-domain'),
    errorCodes= require('./../modules/error-codes');


var router = express.Router();

// POST /login
router.post('/', function (req, res,next) {


    //input data validation
    if (!req.body.uid | !req.body.pwd){
        res.status(401).send(errorResponse(errorCodes().API_Invalid_Input_Data,"Invalid input data",errorDomain().API_Invalid_Input_Data));
        return;
    }

    //HERE YOUR LOGIN OPERATIONS
    //IF OK
    var ret= {
        uid:req.body.uid,
        pwd:req.body.pwd,
        firstName:"Firstname",
        lastName:"Lastname"
    };

    res.status(200).send({user:ret});


});



module.exports = router;