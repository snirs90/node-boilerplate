'use strict';

var Q = require('q');
var Sequelize = require('sequelize');

var UserRepository = require('../../repository/UserRepository');
var UserMail = require('../../services/UserMail');
var UserUtils = require('../../utils/UserUtils');
var UserErrors = require('../../errors');

var controllers = {

    /**
     * Create a new user in the db
     * @param req
     * @param res
     * @param next
     * @returns {*}
     */
    create: function(req, res, next) {



        UserUtils.createConfirmationToken()                                       // create a random token
            .then(function(token){
                req.body.confirmationToken = token;
                return Q.all([UserRepository.create(req.body), token]);           // create the user
            })
            .spread(function(user, token){
                res.promise({ code: 201 });
                return [user, token];
            })
            .spread(function(user, token) {
                return UserMail.welcomeEmail(user, token);         // send welcome email
            })
            .catch(function(err){
                if (err instanceof Sequelize.UniqueConstraintError) {
                    // A user with this email already exists error.
                    err = new UserErrors.UserUniqueError();
                }

                res.promise(Q.reject(err));
            });
    }
};

module.exports = controllers;