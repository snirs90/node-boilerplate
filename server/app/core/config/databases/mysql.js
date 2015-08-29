'use strict';

var nconf = require('nconf'),
    Sequelize = require('sequelize'),
    logger = require('winston');

var dbConf = nconf.get('database');

var mysqlConf = dbConf.mysql;
var host = mysqlConf.host;
var user = mysqlConf.user;
var password = mysqlConf.password;
var database = mysqlConf.database;

var connection = new Sequelize(database, user, password, {
    host: host,
    dialect: 'mysql'
});

connection
    .authenticate()
    .then(function() {
        logger.info('MySQL connection has been established successfully.');
    }, function (err) {
        logger.error('Unable to connect to MySQL database:', err);
    });

module.exports =  connection;