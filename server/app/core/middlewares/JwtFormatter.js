'use strict';

var Q = require('q');

module.exports = jwtFormatter;

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
    // res.status(err.status).json(config);
    res.promise(Q.reject({code: 401, payload: {message: err.message}}));

}
