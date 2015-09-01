'use strict';

var path = require('path');
global.appRoot = path.resolve(__dirname) + '/app'

/* NPM MODULES */
var Q = require('q');

/* CUSTOM MODULES */
var configure       = require('./config');
var mysqlConnection = require('./app/core/config/databases/mysql');
var seedUsers       = require('./app/modules/users').seed;

/**
 * Start the server configuration process.
 */
Q.when(configure)
    .then(function() {
        return mysqlConnection.authenticate();
    })
    .then(seedUsers)
    .then(doneSeeding)
    .catch(errorHandler);

/* ############### PRIVATE FUNCTIONS ############### */


/**
 * Should be invoked when seeding is finished to acknowledge that the
 * seeding process done without any issues
 */
function doneSeeding() {
    console.log('Seed complete successfully!');
    process.exit(0);
}

/**
 * Handles any error that will occur during the seeing process
 * @param err
 */
function errorHandler(err) {
    console.log(err);
    process.exit(1);
}

