(function () {
    'use strict';

    angular.module('nodeBoiler').provider('ErrorHandlerProvider', ErrorHandlerProvider);

    /**
     * Intercept error responses according to their status code
     * @constructor
     */
    function ErrorHandlerProvider() {
        this.$get = ['$injector', '$q', function ($injector, $q) {
            var localStorageService = $injector.get('localStorageService');
            return {
                responseError: function (response) {
                    switch (response.status) {
                        case 401:
                            localStorageService.remove('JWT-Token');
                            go('login');
                            break;
                    }
                    return $q.reject(response);
                }
            };
            function go(state) {
                $injector.get('$state').go(state, null, {location: false});
            }
        }];
    }

}());
