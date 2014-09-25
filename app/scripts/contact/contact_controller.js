'use strict';

angular.module('verdicci.welcome', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/contact', {
        templateUrl: 'scripts/contact/contact_view.html',
        controller: 'ContactCtrl'
    });
}])

.controller('ContactCtrl', function() {

});