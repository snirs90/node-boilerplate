'use strict';

var nodemailer = require('nodemailer'),
    Q          = require('q'),
    nconf = require('nconf');

var transport = require('./transporters/gmail');
var transporter = nodemailer.createTransport(transport);

function MailAPI() {}

/**
 * Send an email.
 *
 * @param {string} toEmail
 * @param {string} subject
 * @param {string} body
 * @param {*} options
 * @private
 */
MailAPI.prototype.send = function(toEmail, subject, body, options) {
    var mailOptions = {
        from   : nconf.get('emailNotifications').from,
        to     : toEmail,
        subject: subject,
        html   : body
    };

    return Q.ninvoke(transporter, 'sendMail', mailOptions)
};

var singleton = new MailAPI();
module.exports = singleton;









