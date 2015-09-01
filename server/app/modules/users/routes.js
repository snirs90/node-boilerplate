'use strict';

var resty = require('node-resty');

var controllers = require('./middlewares/controllers/UserController');
var validations = require('./middlewares/validations/UserValidations');

// Create a new "users" RESTful resource.
var users = new resty.resource('users');

/**
 * An example for get all route.
 */
users.get(function(req, res, next) {
    res.promise({message: 'hello'});
});

/**
 * Define post to users route
 * @route POST /users
 */
users.post(controllers.create)
    .before('post', validations.create);

module.exports = users;