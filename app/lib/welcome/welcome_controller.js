'use strict';

angular.module('verdicci.welcome', ['ngRoute', 'ngSanitize'])

.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/welcome', {
        templateUrl: 'lib/welcome/welcome_view.html',
        controller: 'WelcomeCtrl'
    });
}])

.controller('WelcomeCtrl',['$http', '$sce', function($http, $sce) {
    var instance = this;
    instance.news = [];

    $http.get('data/news.json').success(function(data){
        instance.news = data;
    });

}]);
