'use strict';

var nconf = require('nconf');
var Q = require('q'),
    bcrypt = require('bcrypt'),
    UserRepository = require('../../../users/repository/UserRepository'),
    UserUtil = require('../../../users/utils/UserUtils');

var controllers = {

    /**
     * A middleware for login.
     *
     * @description
     * Verify user credentials, and return a jwt token in return
     *
     * @param req
     * @param res
     * @param next
     */
    login: function (req, res, next) {

        UserRepository.getUserByEmail(req.body.email)
            .then(function(user){
                if (!user) {
                    // email does not exists
                    res.promise(Q.reject({
                        code: 401,
                        message: 'One or more of the given credentials is invalid'
                    }));

                    return;
                }

                // Compare password.
                Q.ninvoke(bcrypt, 'compare', req.body.password, user.password)
                    .then(function(result) {
                        if (!result) {
                            // Password doesn't match.
                            throw new Error('Password is incorrect.');
                        }

                        var token = UserUtil.createJwtToken(user);
                        res.promise({token: token});
                    })
                    .catch(function(err) {
                        res.promise(Q.reject({
                            code: 401,
                            message: 'One or more of the given credentials is invalid'
                        }));
                    });
            });
    },

    /**
     * Login the user through a token.
     *
     * @param req
     * @param res
     * @param next
     */
    loginByToken: function(req, res, next){

        UserRepository.getUserByConfirmationToken(req.query.token)
            .then(function(user){

                if (!user) {
                    // No user found with this token.
                    res.redirect(nconf.get('app').clientUrl + '/login?error=invalid');
                    return;
                }

                // Found a user with this token.
                if(user) {
                    var promise = Q.when();
                    if (!user.active) {
                        promise = user.updateAttributes({ active: true });
                    }

                    promise.then(function() {
                        var token = UserUtil.createJwtToken(user);
                        res.redirect('http://localhost:5510/login?token=' + token);
                    });

                }
            });
    }

};

module.exports = controllers;