'use strict';

module.exports = {
    routes : require('./routes'),
    Models: {
        User: require('./models/UserModel')
    },
    repository: {
        User : require('./repository/UserRepository')
    },
    utils: {
        User : require('./utils/UserUtils')
    },
    errors: require('./errors'),
    seed   : require('./seed')
};