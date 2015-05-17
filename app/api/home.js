/**
 * Created by domenicovacchiano on 17/05/15.
 */

//REST implementation

var express = require('express'),
    errorResponse = require('./../modules/error-response'),
    errorDomain= require('./../modules/error-domain'),
    errorCodes= require('./../modules/error-codes');


var router = express.Router();

//GET /customers'
router.get('/', function (req, res,next) {
    res.status(200).send("Great! It works ;-)");
});



module.exports = router;