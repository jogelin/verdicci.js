'use strict';

angular.module('verdicci.welcome', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/openhours', {
        templateUrl: 'scripts/openhours/openhours_view.html',
        controller: 'OpenHoursCtrl'
    });
}])

.controller('OpenHoursCtrl', function() {

});