'use strict';

var crypto = require('crypto'),
    Q      = require('q'),
    jwt = require('jsonwebtoken'),
    nconf = require('nconf'),
    bcrypt = require('bcrypt'),
    tokenConfig = nconf.get('auth').token;

var UserErrors = require('../errors');

/**
 * Create a random token
 * @returns {Promise} - with the String of the token
 */
function createConfirmationToken(){
    return Q.ninvoke(crypto, 'randomBytes', 48)
        .then(function(ex){
           return ex.toString('hex');
        });
}

/**
 * Create a JWT token for the user.
 *
 * @param {*} user - the user object.
 * @returns {string} - jwt token
 */
function createJwtToken(user) {
    if (!user.id) {
        throw new UserErrors.UserSecurityJWTMissingData
    }

    return jwt.sign({id: user.id}, tokenConfig.secret, {expiresInMinutes: tokenConfig.expiresInMinutes});
}

/**
 * Encrypt password.
 *
 * @param password
 * @returns {*}
 */
function encryptPassword(password) {
    return Q.ninvoke(bcrypt , 'genSalt', 10)
        .then(function(salt){
            return Q.ninvoke(bcrypt , 'hash', password, salt);
        })
        .then(function(hash) {
            return hash;
        })
}

module.exports = {
    createConfirmationToken: createConfirmationToken,
    createJwtToken: createJwtToken,
    encryptPassword: encryptPassword
};