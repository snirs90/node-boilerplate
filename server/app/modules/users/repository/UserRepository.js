"use strict";

var mysql     = require(appRoot + '/core/config/databases/mysql'),
    Sequelize = require('sequelize'),
    User      = require('../models/UserModel');

module.exports = {
    getUserById: getUserById,
    getUserByEmail: getUserByEmail,
    getUserByConfirmationToken: getUserByConfirmationToken,
    create: create
};

/**
 * Get user by id.
 *
 * @param {int} userId
 * @returns {*}
 */
function getUserById(userId){
    return User.findOne({
        attributes: ['id', 'password', 'active', 'deleted_at'],
        where: { id: userId, active: true }
    });
}

/**
 * Get user by email.
 *
 * @param {string} email
 * @returns {*}
 */
function getUserByEmail(email){
    return User.findOne({
        attributes: ['id', 'password', 'active', 'deleted_at'],
        where: { email: email, active: true }
    });
}

/**
 * Get user by confirmation token.
 *
 * @param {string} token
 * @returns {*}
 */
function getUserByConfirmationToken(token){
    return User.findOne({
        attributes: ['id', 'active', 'deleted_at'],
        where : { confirmationToken: token }
    });
}

/**
 * Create a new user.
 *
 * @param {*} data - the user data.
 * @returns {*}
 */
function create(data){
    return User.create({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: data.password,
        receiveInvoice: data.receiveInvoice,
        confirmationToken: data.confirmationToken,
        active: data.active
    });
}