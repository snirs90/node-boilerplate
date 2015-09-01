"use strict";

var Q = require('q');

var validations = {

    /**
     * A middleware to validate a new user creation.
     *
     * @param req
     * @param res
     * @param next
     * @returns {*}
     */
    create: function(req, res, next) {
        req.check('email', 'Email must be provided').notEmpty();
        req.check('password', 'Password must be provided').notEmpty();

        var errors = req.validationErrors(true);
        if (errors) {
            return res.promise(Q.reject({ code: 400, errors: errors }));
        }

        next();
    }

};

module.exports = validations;