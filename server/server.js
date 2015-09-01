'use strict';

var path = require('path');
global.appRoot = path.resolve(__dirname) + '/app';

/* NPM MODULES */
var express = require('express');
var bodyParser = require('body-parser');
var compress = require('compression');
var expressValidator = require('express-validator');
var nconf = require('nconf');
var jwt = require('express-jwt');
var cors = require('cors');
var Q = require('q');

var passport = require('passport');
var Strategy = require('passport-local').Strategy;

// Express app.
var app = express();

/* CUSTOM MODULES */
var configure = require('./config');
var mysqlConnection = require('./app/core/config/databases/mysql');
var restAPIFormatter = require('./app/core/middlewares/RestAPIFormatter');
var JwtFormatter = require('./app/core/middlewares/JwtFormatter');
var logger;

/**
 * Start the server configuration process.
 */
Q.when(configure)
    .then(function() {
        return mysqlConnection.authenticate();
    })
    .then(setupApp)
    .then(registerModules)
    .then(setupSecurity)
    .then(registerModuleRoutes)
    .then(runServer)
    .catch(function(err) {
        logger.error(err);
    });

/* ############### PRIVATE FUNCTIONS ############### */

/**
 * Setup the application configurations.
 * @returns {boolean}
 */
function setupApp() {

    logger = require('./app/core/config/logger');

    app.use(compress());

    // parse application/x-www-form-urlencoded
    app.use(bodyParser.urlencoded({extended: false}));

    // parse application/json
    app.use(bodyParser.json());

    app.use(expressValidator());

    app.use(cors());

    // Rest API formatter
    app.use(restAPIFormatter);

    return true;
}

/**
 * Setup app security configurations.
 *
 * @param {*} modules - the modules references.
 */
function setupSecurity(modules) {
    // jwt middleware
    app.use('/api',
        jwt({secret: nconf.get('auth').token.secret})
            .unless({ path: nconf.get('security').excludeRoutes }),
            modules.security.authentication().unless({ path: nconf.get('security').excludeRoutes })
    );

    // last middleware to catch unauthorized requests
    app.use(JwtFormatter);

    return modules;
}

/**
 * Run the server.
 */
function runServer() {
    var server = app.listen(nconf.get('app').port, function () {
        var port = server.address().port;
        logger.info('server listening at http://localhost:%s', port);
    });
}

/**
 * Register the modules.
 * @returns {exports}
 */
function registerModules() {
    return require('./app/modules');
}

/**
 * Register modules routes.
 * @param modules
 */
function registerModuleRoutes(modules) {
    return require('./app/core/registerRoutes')(app, modules);
}