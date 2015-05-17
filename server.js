#!/bin/env node
/**
 * Created by domenicovacchiano on 17/05/15.
 */

//  OpenShift sample Node application
var express = require('express'),
    security=require('./app/modules/basic-auth-security'),
    bodyParser = require('body-parser'),
    errorResponse = require('./app/modules/error-response'),
    errorDomain= require('./app/modules/error-domain');


/**
 *  Define the sample application.
 */
var SampleApp = function() {

    //basic auth credentials
    //TODO you can get uid and pwd for example from a developers db table (ApiKey, Password)
    var basicAuthCredentials={
        uid:"my_uid",
        pwd:"my_pwd"
    };


    //  Scope.
    var self = this;


    /*  ================================================================  */
    /*  Helper functions.                                                 */
    /*  ================================================================  */

    /**
     *  Set up server IP address and port # using env variables/defaults.
     */
    self.setupVariables = function() {
        //  Set the environment variables we need.
        self.ipaddress = process.env.OPENSHIFT_NODEJS_IP;
        self.port      = process.env.OPENSHIFT_NODEJS_PORT || 8080;

        if (typeof self.ipaddress === "undefined") {
            //  Log errors on OpenShift but continue w/ 127.0.0.1 - this
            //  allows us to run/test the app locally.
            console.warn('No OPENSHIFT_NODEJS_IP var, using 127.0.0.1');
            self.ipaddress = "127.0.0.1";
        };
    };



    /**
     *  terminator === the termination handler
     *  Terminate server on receipt of the specified signal.
     *  @param {string} sig  Signal to terminate on.
     */
    self.terminator = function(sig){
        if (typeof sig === "string") {
            console.log('%s: Received %s - terminating sample app ...',
                Date(Date.now()), sig);
            process.exit(1);
        }
        console.log('%s: Node server stopped.', Date(Date.now()) );
    };


    /**
     *  Setup termination handlers (for exit and a list of signals).
     */
    self.setupTerminationHandlers = function(){
        //  Process on exit and signals.
        process.on('exit', function() { self.terminator(); });

        // Removed 'SIGPIPE' from the list - bugz 852598.
        ['SIGHUP', 'SIGINT', 'SIGQUIT', 'SIGILL', 'SIGTRAP', 'SIGABRT',
            'SIGBUS', 'SIGFPE', 'SIGUSR1', 'SIGSEGV', 'SIGUSR2', 'SIGTERM'
        ].forEach(function(element, index, array) {
                process.on(element, function() { self.terminator(element); });
            });
    };



    /**
     *  Initializes the sample application.
     */
    self.initialize = function() {
        self.setupVariables();

        self.setupTerminationHandlers();

        // Create the express server.
        self.app = express();

        //Sets body parser
        self.app.use(bodyParser.urlencoded({ extended: true }));
        self.app.use(bodyParser.json());

        //Requires authentication on each request
        //Each request on this server, will expect an header with basic auth credentials my_uid and my_pwd
        self.app.all('*', security(basicAuthCredentials.uid,basicAuthCredentials.pwd).auth)

        //Requires index api for routing (see app/api/index.js)
        var router = require('./app/api')(self.app);

    };


    /**
     *  Start the server (starts up the sample application).
     */
    self.start = function() {
        //  Start the app on the specific interface (and port).
        self.app.listen(self.port, self.ipaddress, function() {
            console.log('%s: Node server started on %s:%d ...',
                Date(Date.now() ), self.ipaddress, self.port);
        });

        //http error handling on \ path
        self.app.use(function(err, req, res, next) {
            console.log(err);
            res.status(500).send(errorResponse(500,"Application Error",errorDomain().App_ApplicationError));
        });

    };



};   /*  Sample Application.  */


/**
 *  main():  Main code.
 */
var zapp = new SampleApp();
zapp.initialize();
zapp.start();