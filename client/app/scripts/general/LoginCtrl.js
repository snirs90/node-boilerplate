(function () {
    'use strict';

    angular.module('nodeBoiler')
        // Controller Declaration
        .controller('LoginCtrl', [
            '$scope',
            'Auth',
            '$state',
            '$location',
            LoginCtrl
        ]);

    function LoginCtrl($scope, Auth, $state, $location) {

        //==============================
        //          MODELS             =
        //==============================

        $scope.signIn = {};
        var _generalErrorMessage = 'An error had occur during the login process';

        var queryString = $location.search();
        if (queryString.token) {
            // User wants to login with token.
            if (Auth.loginWithToken(queryString.token)) {
                $state.go('layout.main');
            }
            else {
                $scope.signIn.error = 'Invalid access token. try to login with email and password.';
            }
        }

        //==============================
        //      PRIVATE FUNCTIONS      =
        //==============================

        //==============================
        //        PUBLIC API           =
        //==============================

        /**
         * Submit the login form
         */
        $scope.submit = function () {
            Auth.login($scope.signIn.email, $scope.signIn.password)
                .then(function (result) {
                    $scope.signIn.error = null;
                    $state.go('layout.main');
                })
                .catch(function (err) {
                    if (!err.data) {
                        err.data = {
                            message: _generalErrorMessage
                        }
                    }
                    $scope.signIn.error = err.data.message || _generalErrorMessage;
                });
        };

        /**
         * Go to signup page
         */
        $scope.signup = function() {
            $state.go('signup');
        };

        /**
         * Hide the alert element
         */
        $scope.closeAlert = function () {
            $scope.signIn.error = null;
        };

        //==============================
        //            INIT             =
        //==============================

    }

}());


