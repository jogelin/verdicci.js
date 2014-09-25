'use strict';

(function(){
angular.module('verdicci', ['ngResource','ngRoute','ngAnimate', 'ngMaterial']);

    angular.module('verdicci', ['ngRoute','verdicci.menu','verdicci.welcome'])
        .config(['$routeProvider', function($routeProvider) {
            $routeProvider.otherwise({redirectTo: '/welcome'});
        }
    ]);

})();