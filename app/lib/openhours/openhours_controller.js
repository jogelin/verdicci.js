'use strict';

angular.module('verdicci.openhours', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/openhours', {
        templateUrl: 'lib/openhours/openhours_view.html',
        controller: 'OpenHoursCtrl'
    });
}])

.controller('OpenHoursCtrl', function() {

});