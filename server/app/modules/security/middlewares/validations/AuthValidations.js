"use strict";

var Q = require('q');

var validations = {

    /**
     * A middleware to validate login route.
     *
     * @description
     *  Validates the user data.
     *
     * @param req
     * @param res
     * @param next
     */
    login: function(req, res, next) {
        req.check('email', 'An email must be provided.').notEmpty().isEmail();
        req.check('password', 'A password must be provided.').notEmpty();

        var errors = req.validationErrors(true);
        if (errors) {
            return res.promise(Q.reject({code: 400, errors: errors}));
        }

        next();
    }

};

module.exports = validations;