'use strict';

module.exports = seedUsers;

var User = require('./models/UserModel');

var Q = require('q');

/**
 * Drop the users table and then create fictive user entities in the DB
 * @return {Promise}
 */
function seedUsers(){

    return User.drop()
        .then(function(){
            return Q.ninvoke(User, 'sync');
        })
        .then(function(){
            return User.create({
                firstName: 'firstname',
                lastName: 'lastname',
                email: 'example@email.com',
                password: '1234'
            });
        })
        .catch(function(err){
            console.log(err.message);
        });
}
