"use strict";

var nconf = require('nconf');

module.exports = {
    service: 'gmail',
    auth: nconf.get('mailService').gmail.auth
};