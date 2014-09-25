'use strict';

angular.module('verdicci.menu', ['ngRoute'])

.factory('Menu', function () {

    function Menu(_name, _title, url, _active) {
        this.name = _name;
        this.title = _title;
        this.url = url;
        this.active = _active;
    }

    Menu.prototype.activeFromRoute = function (route) {
        if(url.contains(route.name)) {

        if(route.parameters['category'] != null)
            _active = url.contains(route.parameters['category'])?true:false;
        else
            _active = true;
        }
        else {
            _active = false;
        }
        /*if(_active) {
        print(route.name);
        print(url);
        }   */
    };

    Menu.build = function (data) {
        return new Menu(
            data.name,
            data.title,
            data.url,
            data.active
        );
    };

    return Menu;
})

.controller('MenuCtrl', ['Menu', '$filter','$location','$rootScope', function(Menu, $filter, $location, $rootScope) {
    var instance = this;
    this.menus = [
        new Menu('ACCEUIL', 'YOU', '/welcome', true),
        new Menu('HOME', 'HOME', '/styles/home', false),
        new Menu('STYLE', 'STYLE', '/styles/style', false),
        new Menu('ACCESSOIRES', 'ACCESSOIRES', '/styles/accessories', false),
        new Menu('HEURES D\'OUVERTURE', 'TO WELCOME YOU', '/openhours', false),
        new Menu('CONTACT', 'TO SEE YOU', '/contact', false)];

    this.currentMenu = function() {
        return $filter('filter')(this.menus, {active:true}, true)[0];
    }

    this.handleClick = function(menu) {
        $location.url(menu.url);
    }

    $rootScope.$on('$routeChangeStart', function(event, current, previous) {
        angular.forEach(instance.menus, function(value, key) {
            value.active = angular.equals($location.path(), value.url);
        });
    });
}]);