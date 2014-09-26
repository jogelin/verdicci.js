'use strict';

angular.module('verdicci.contact', ['ngRoute','ngMap'])

.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/contact', {
        templateUrl: 'lib/contact/contact_view.html',
        controller: 'ContactCtrl'
    });
}])

.controller('ContactCtrl', ['$scope', function() {

}]);