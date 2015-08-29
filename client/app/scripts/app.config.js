(function () {
    'use strict';

    angular.module('nodeBoiler')

        // Loading bar settings
        .config(['cfpLoadingBarProvider', function (cfpLoadingBarProvider) {
            cfpLoadingBarProvider.includeSpinner = false;
        }])

        // RESTAngular base url config
        .config(['RestangularProvider', 'config', function (RestangularProvider, config) {
            RestangularProvider.setBaseUrl(config.RESTServerUrl);
        }])

        // Intercept 401 responses
        .config(['$httpProvider', function ($httpProvider) {
            $httpProvider.interceptors.push('ErrorHandlerProvider');
        }])

        .config(['$locationProvider', function ($locationProvider) {
            $locationProvider.html5Mode(true).hashPrefix('!');
        }])

        // local storage prefix config
        .config(['localStorageServiceProvider', function (localStorageServiceProvider) {
            localStorageServiceProvider
                .setPrefix('nodeBoiler');
        }])

        // request jwt interceptor
        .config(['$httpProvider', 'jwtInterceptorProvider', function ($httpProvider, jwtInterceptorProvider) {
            jwtInterceptorProvider.tokenGetter = ['config', 'localStorageService', 'jwtHelper', 'Auth', function (config, localStorageService, jwtHelper, Auth) {
                if (!!~config.url.indexOf('login')) {
                    return;
                }
                if (!Auth.isAuthenticated) {
                    Auth.logout();
                    return '';
                } else {
                    return Auth.getToken();
                }
            }];
            $httpProvider.interceptors.push('jwtInterceptor');
        }]);

}());
