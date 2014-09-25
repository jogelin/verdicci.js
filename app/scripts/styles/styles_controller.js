'use strict';

angular.module('verdicci.welcome', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/styles/:category', {
        templateUrl: 'scripts/styles/style_view.html',
        controller: 'StyleCtrl'
    });
}])

.controller('StylesCtrl', function() {

});