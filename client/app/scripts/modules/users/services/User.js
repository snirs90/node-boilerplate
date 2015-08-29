(function () {
    'use strict';
    angular.module('nodeBoiler')
        .service('User', [
            'ServerAPI',
            function (ServerAPI) {

                angular.extend(this, {
                   create: create
                });

                /**
                 * Create a post request to the server to the create user route
                 * @param data - should be Object type with all user entity fields
                 * @returns {Q.Promise}
                 */
                function create(data){
                    return ServerAPI.all('users').post({
                        email: data.email,
                        password: data.password,
                        firstName: data.firstName,
                        lastName: data.lastName,
                        country: data.country,
                        receiveInvoice: data.receiveInvoice,
                        address: data.address
                    });
                }

            }]);
}());

