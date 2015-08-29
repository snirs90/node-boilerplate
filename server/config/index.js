'use strict';

var nconf = require('nconf');
var Q = require('q');

nconf.argv()
    .env().
    file('global', 'config.json');

switch (nconf.get('NODE_ENV')) {
    case 'local':
        nconf.file('env', './config/env/dev.json');
        break;
    default:
        nconf.file('env', './config/env/dev.json');
}

module.exports = nconf;