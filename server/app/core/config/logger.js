'use strict';

var logger = require('winston');
var nconf = require('nconf');

logger.remove(logger.transports.Console);
logger.add(logger.transports.Console, {level: 'debug'});

nconf.get('logger').transports.forEach(function (transport) {
    logger.add(logger.transports.File, transport);
});

module.exports = logger;
