"use strict";

var UserRepository = require(appRoot + '/modules/users').repository.User;
var SecurityErrors = require('../errors');

/**
 * Check if user is exists and valid.
 * @extend express-unless
 *
 * @param {*} middlewareOptions
 */
module.exports = function validateAuthenticatedUser(middlewareOptions) {

    /**
     *
     * @param req
     * @param res
     * @param next
     * @returns {*}
     */
    var validateAuthenticatedUser = function(req, res, next) {
        var userId = req.user.id;

        return UserRepository.getUserById(userId)
            .then(function (user) {
                if (!user) {
                    next(new SecurityErrors.SecurityInvalidUser());
                    return;
                }

                next();
            })
            .catch(function (err) {
                next(new SecurityErrors.SecurityInvalidUser());
            });
    };

    validateAuthenticatedUser.unless = require('express-unless');

    return validateAuthenticatedUser;

};