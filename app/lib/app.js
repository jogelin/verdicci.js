'use strict';

(function(){

    angular.module('verdicci', ['ngRoute','ngAnimate', 'ngMaterial','verdicci.menu','verdicci.welcome','verdicci.styles','verdicci.openhours','verdicci.contact'])
        .config(['$routeProvider','$compileProvider', function($routeProvider,$compileProvider) {

            //allow to use tel links
            $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|tel):/);


            $routeProvider.otherwise({redirectTo: '/welcome'});
        }
    ]);

})();