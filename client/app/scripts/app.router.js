(function () {
    'use strict';

    angular.module('nodeBoiler')
        .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {

            $urlRouterProvider.otherwise('/main');

            $stateProvider

                .state('layout', {
                    abstract: true,
                    views: {
                        'index': {
                            templateUrl: 'views/general/layout.html',
                            controller: 'LayoutCtrl',
                            resolve: {
                                isAuthenticated: ['Auth', '$state', function(Auth, $state) {
                                    if (!Auth.isAuthenticated()) {
                                        $state.go('login');
                                    }
                                }]
                            }
                        }
                    }
                })

                .state('layout.main', {
                    url: '/main',
                    views: {
                        'main@layout': {
                            templateUrl: 'views/general/main.html',
                            controller: 'MainCtrl'
                        }
                    }
                })

                .state('login', {
                    url: '/login',
                    views: {
                        'index': {
                            templateUrl: 'views/general/login.html',
                            controller: 'LoginCtrl',
                            resolve: {
                                isAuthenticated: ['Auth', '$state', function(Auth, $state) {
                                    if (Auth.isAuthenticated()) {
                                        $state.go('layout.main');
                                    }
                                }]
                            }
                        }
                    }
                })

                .state('signup', {
                    url: '/signup',
                    views: {
                        'index': {
                            templateUrl: 'views/general/signup.html',
                            controller: 'SignupCtrl'
                        }
                    }
                });

        }]);
}());
