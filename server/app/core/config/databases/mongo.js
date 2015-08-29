'use strict';

var nconf = require('nconf'),
    mongoose = require('mongoose'),
    logger = require('winston');

var dbConf = nconf.get('database');

/**
 * Initialize connection to mongoDB.
 */
var mongoConf = dbConf.mongo;

var host = mongoConf.host;
var port = mongoConf.port;
var database = mongoConf.db;

var dbURI = 'mongodb://' + host + ':' + port + '/' + database;

mongoose.connect(dbURI);

mongoose.connection.on('open', function (err) {
    logger.info('MongoDB connection established');
});

module.exports = mongoose;