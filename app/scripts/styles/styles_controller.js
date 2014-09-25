'use strict';

angular.module('verdicci.styles', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/styles/:category', {
        templateUrl: 'scripts/styles/styles_view.html',
        controller: 'StylesCtrl'
    });
}])

.controller('StylesCtrl',['$http','$routeParams', function($http, $routeParams) {
    var instance = this;
    instance.styles = [];

    this.currentCategory = $routeParams.category;

    $http.get('data/styles.json').success(function(data){
        instance.styles = data;
    });
}]);