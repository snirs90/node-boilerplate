'use strict';

var resty = require('node-resty');
var authCtrl = require('./middlewares/controllers/AuthController');
var authValidations = require('./middlewares/validations/AuthValidations');

// Create a new "login" RESTful resource.
var security = new resty.resource('login');

/**
 * @description
 * Define a login route.
 * @route POST /login
 */
security.post(authCtrl.login)
    .before('post', authValidations.login);

/**
 * @description
 * Define a login route that handles login requests from the
 * Welcome email
 * @route GET /login?token=confirmationToken
 */
security.get(authCtrl.loginByToken);

module.exports = security;