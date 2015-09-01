'use strict';

var Q = require('q');

function SecurityUnauthorizedError(message) {
    this.name = this.constructor.name;
    this.status = 401;
    this.code = 401;
    this.message = message || "No authorization token was found";
}

/**
 * @name middleware
 * @function
 *
 * @description
 * if error occur then return it in that format {message: error's message} and with the error status:
 * @param err
 * @param res
 * @param req
 * @param next
 */
function jwtFormatter(err, req, res, next) {
    if (!err) {
        next();
    }
    res.promise(Q.reject(new SecurityUnauthorizedError(err.message)));
}

module.exports = jwtFormatter;