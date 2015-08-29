(function () {
    'use strict';
    angular.module('nodeBoiler')
        .service('Auth', [
            'Restangular',
            'localStorageService',
            'jwtHelper',
            function (Restangular, localStorageService, jwtHelper) {
                'use strict';

                angular.extend(this, {
                    login: login,
                    logout: logout,
                    getToken: getToken,
                    loginWithToken: loginWithToken,
                    isAuthenticated: isAuthenticated
                });

                /**
                 * Executes login request to the server with the given login credentials
                 * once response was received the token will be save in the local storage
                 * @param email
                 * @param password
                 * @returns {Promise}
                 */
                function login(email, password) {
                    return Restangular.all('login').post({
                        email: email,
                        password: password
                    })
                        .then(function (res) {
                            if (!res.token) {
                                throw new Error('Invalid response from the server');
                            }
                            return localStorageService.set('JWT-token', res.token);
                        });
                }

                /**
                 * Clear all local storage
                 * @returns {*}
                 */
                function logout() {
                    return localStorageService.clearAll();
                }

                /**
                 * Save the JWT-token to the local storage.
                 *
                 * @param {string} token
                 * @private
                 */
                function loginWithToken(token) {
                    if (!_validateToken(token)) {
                        return false;
                    }

                    return localStorageService.set('JWT-token', token);
                }

                /**
                 * Get JWT-token data from the local storage
                 * @returns {String}
                 */
                function getToken() {
                    return localStorageService.get('JWT-token');
                }

                /**
                 * Check if the there is an auth token (JWT-token) and if it is valid
                 * @returns {Boolean}
                 */
                function isAuthenticated() {
                    var token = localStorageService.get('JWT-token');
                    if (!token || typeof token !== 'string' || !token.length) {
                        return false;
                    }

                    return !jwtHelper.isTokenExpired(token);
                }

                /**
                 * Check if the JWT-token is valid.
                 *
                 * @param {string} token
                 * @returns {boolean}
                 * @private
                 */
                function _validateToken(token) {
                    if (!token || typeof token !== 'string' || !token.length) {
                        return false;
                    }
                    return !jwtHelper.isTokenExpired(token);
                }


            }]);
}());
