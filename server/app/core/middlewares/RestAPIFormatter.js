'use strict';

var nconf = require('nconf'),
    Q = require('q'),
    _ = require('lodash'),
    logger = require('winston');

module.exports = middleware;

/**
 * @name middleware
 * @function
 *
 * @description
 * middleware to exposes a 'promise' function on express' response object that accepts a q's promise and, once resolved,
 * gets returned in a restful manner.
 *
 *
 * @param {req} req express' req object.
 * @param {res} res express' res object..
 * @param {Function} next express' next().
 * @returns {promise} q promise, resolved when an sms has been sent.
 */
function middleware(req, res, next) {

    res.promise = function (promise) {

        Q.when(promise)
            .then(formatResponse)
            .catch(throwError);

        // create a unified format for the response
        function formatResponse(data) {
            var config = {
                code: data.code,
                payload: data.payload || data
            };
            // check if code field is a valid number
            if (!_.isNumber(config.code)) {
                config.code = 200;
            }

            res.status(config.code).json(config.payload);
        }

        function throwError(error) {
            var config = {
                code: error.code,
                payload: error.payload || error
            };
            // check if code field is a valid number
            if (!_.isNumber(config.code)) {
                config.code = 500;
            }
            res.status(config.code).json(config.payload);
            logger.error(error);
        }
    };

    return next();
}



