/* global angular */
(function (angular) {

    'use strict';

    angular.module('nodeBoiler').factory('ServerAPI', ['config', 'Restangular', function(config, Restangular) {
        return Restangular.withConfig(function(RestangularConfigurer) {
            RestangularConfigurer.setBaseUrl(config.RESTServerUrl + '/api');
        })

    }]);

}(angular));