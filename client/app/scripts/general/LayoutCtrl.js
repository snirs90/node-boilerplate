(function () {
    'use strict';

    angular.module('nodeBoiler')
        // Controller Declaration
        .controller('LayoutCtrl', [
            '$scope',
            'Auth',
            '$state',
            LayoutCtrl
        ]);

    function LayoutCtrl($scope, Auth, $state) {


        //==============================
        //          MODELS             =
        //==============================

        //==============================
        //      PRIVATE FUNCTIONS      =
        //==============================

        //==============================
        //        PUBLIC API           =
        //==============================

        $scope.logout = function () {
            Auth.logout();
            $state.go('login');
        };

        //==============================
        //            INIT             =
        //==============================

    }

}());


