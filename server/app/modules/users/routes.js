'use strict';

var resty = require('node-resty');

var controllers = require('./middlewares/controllers/users.ctrl');

// Create a new "users" RESTful resource.
var users = new resty.resource('users');

users.get(function(req, res, next) {
    res.promise({message: 'hello'});
});

/**
 * Define post to users route
 * @route POST /users
 */
users.post(controllers.create);

module.exports = users;