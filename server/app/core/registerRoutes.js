'use strict';

/**
 * Register the routes of the modules.
 * @param app
 * @param modules
 */
module.exports = function registerRoutes(app, modules) {

    var users = modules.users.routes;
    app.use('/api', users.register());

    var security = modules.security.routes;
    app.use(security.register());

    return true;
};