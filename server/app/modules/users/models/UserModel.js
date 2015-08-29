'use strict';

var mysql        = require(appRoot + '/core/config/databases/mysql'),
    Sequelize    = require('sequelize'),
    logger       = require('winston'),
    Q            = require('q'),
    bcrypt       = require('bcrypt');

var UserUtils    = require('../utils/UserUtils');

var User = mysql.define('users', {
    firstName: {
        type : Sequelize.STRING,
        field: 'firstname'
    },
    lastName : {
        type : Sequelize.STRING,
        field: 'lastname'
    },
    email    : {
        type : Sequelize.STRING,
        field: 'email',
        unique: true
    },
    password : {
        type : Sequelize.STRING,
        field: 'password'
    },
    confirmationToken : {
        type : Sequelize.STRING,
        field: 'confirmation_token'
    },
    active   : {
        type : Sequelize.BOOLEAN,
        field: 'active',
        defaultValue: false
    }
},
{
    freezeTableName: true, // Model tableName will be the same as the model name
    paranoid: true,
    underscored: true
});

User.sync()
    .then(function(){
        logger.info('User model synced')
    })
    .catch(function(){
        logger.error('Failed to sync User model')
    });

module.exports = User;

User.hook('beforeCreate', function(user){
    if (!user.password) {
        return;
    }
    /**
     * Encrypt the password before creating the user.
     */
    return UserUtils.encryptPassword(user.password)
        .then(function(hash) {
            user.password = hash;
        });
});

User.hook('beforeUpdate', function(user){
    if (!user.password) {
        return;
    }
    /**
     * Encrypt the password before updating the user.
     */
    return UserUtils.encryptPassword(user.password)
        .then(function(hash) {
            user.password = hash;
        });
});