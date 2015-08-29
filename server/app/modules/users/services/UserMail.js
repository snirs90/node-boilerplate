"use strict";

var nconf = require('nconf');

var MailAPI = require(appRoot + '/core/services/Mail');
var UserErrors = require('../errors');

var logger = require('winston');

/**
 * Send a welcome email to a new user with a url for first login.
 *
 * @param {string} user
 * @param {string} token
 * @returns {Promise<T>}
 */
function _welcomeEmail(user, token){
    if (!user || (user && !user.email)) {
        throw  new UserErrors.UserMailMissingData();
    }

    var subject = 'Welcome To Node Boilerplate!';
    var body = '<p>Please follow this url in order to sign up into your account </p>' +
        '<a href="'+ nconf.get('app').serverUrl + '/login?token=' + token + '"> Link </a>';

    return MailAPI.send(user.email, subject, body)
        .then(function() {
            logger.info('UserMail', 'welcome message has been sent to user: ' + user.id);
        })
}

module.exports = {
    welcomeEmail: _welcomeEmail
};