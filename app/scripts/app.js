'use strict';

(function(){

    angular.module('verdicci', ['ngRoute','ngAnimate', 'ngMaterial','verdicci.menu','verdicci.welcome','verdicci.styles','verdicci.openhours','verdicci.contact'])
        .config(['$routeProvider','$compileProvider','$locationProvider', function($routeProvider,$compileProvider,$locationProvider) {

            //allow to use tel links
            $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|tel):/);

            // configure html5 to map link
            /*$locationProvider.html5Mode({
                enabled: true,
                requireBase: false
            }); */

            $routeProvider.otherwise({redirectTo: '/welcome'});
        }
    ]);

})();