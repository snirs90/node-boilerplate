(function () {
    'use strict';

    angular.module('nodeBoiler')
        // Controller Declaration
        .controller('SignupCtrl', [
            '$scope',
            'User',
            '$state',
            'formPatterns',
            '$modal',
            SignupCtrl
        ]);

    function SignupCtrl($scope, User, $state, formPatterns, $modal) {


        //==============================
        //          MODELS             =
        //==============================

        _initUserModel();
        $scope.signup = {};
        $scope.formPatterns = formPatterns;
        var _generalErrorMessage = 'An error had occur during the creation process';

        //==============================
        //      PRIVATE FUNCTIONS      =
        //==============================

        /**
         * opens the thank you nodal
         * @private
         */
        function _openModal() {
            $modal.open({
                animation: true,
                templateUrl: 'thankYouSignup.html',
                controller: ['$modalInstance', '$scope', function($modalInstance, $scope){
                    /**
                     * Closes the modal
                     */
                    $scope.close = function(){
                        $modalInstance.close();
                    }
                }],
                size: 'sm'
            });
        }

        /**
         * Prepare the address object to be sent forward
         * @param number
         * @param street
         * @param country
         * @returns {{address: string, country: *}}
         * @private
         */
        function _createAddressObject(number, street, country){
            return {
                address: street + ' ' + number,
                country: country
            }
        }

        /**
         * Initiates the user modal that is bind to the form
         * @private
         */
        function _initUserModel(){
            $scope.userModel = {
                receiveInvoice: 'email'
            };
        }

        //==============================
        //        PUBLIC API           =
        //==============================

        /**
         * Submit the form
         */
        $scope.submit = function(){
            if($scope.userModel.address && ($scope.userModel.address.street || $scope.userModel.address.country)){
                $scope.userModel.address = _createAddressObject($scope.userModel.address.number, $scope.userModel.address.street, $scope.userModel.address.country);
            }
            User.create($scope.userModel)
                .then(function(res){
                    $scope.signup.error = null;
                    $scope.userForm.$setPristine(true);
                    $scope.userForm.$setUntouched(true);
                    _initUserModel();
                    _openModal();
                })
                .catch(function(err){
                    if (!err.data) {
                        err.data = {
                            message: _generalErrorMessage
                        }
                    }
                    $scope.signup.error = err.data.message || _generalErrorMessage;
                });
        };

        /**
         * Hide the alert element
         */
        $scope.closeAlert = function () {
            $scope.signup.error = null;
        };



        //==============================
        //            INIT             =
        //==============================

    }

}());

