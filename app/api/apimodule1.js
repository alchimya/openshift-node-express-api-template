/**
 * Created by domenicovacchiano on 17/05/15.
 */

//REST implementation

var express = require('express'),
    errorResponse = require('./../modules/error-response'),
    errorDomain= require('./../modules/error-domain'),
    errorCodes= require('./../modules/error-codes');


var router = express.Router();

//GET /apimodule1'
router.get('/', function (req, res,next) {
    res.status(200).send("Great! It works ;-)");
});

//GET /apimodule1/:id/'
router.get('/:id', function (req, res,next) {

    if (!req.params.id){
        res.status(401).send(errorResponse(errorCodes().API_Invalid_Input_Data,"Invalid input data",errorDomain().API_Invalid_Input_Data));
        return;
    }
    res.status(200).send("Your id is:" + req.params.id);

});



module.exports = router;