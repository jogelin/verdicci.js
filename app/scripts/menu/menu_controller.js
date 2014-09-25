'use strict';

angular.module('verdicci.menu', ['ngRoute'])

.factory('Menu', function () {

    function Menu(_name, _title, _routeKey, _active) {
        this.name = _name;
        this.title = _title;
        this.routeKey = _routeKey;
        this.active = _active;
    }

    Menu.prototype.activeFromRoute = function (route) {
        if(_routeKey.contains(route.name)) {

        if(route.parameters['category'] != null)
            _active = _routeKey.contains(route.parameters['category'])?true:false;
        else
            _active = true;
        }
        else {
            _active = false;
        }
        /*if(_active) {
        print(route.name);
        print(_routeKey);
        }   */
    };

    Menu.build = function (data) {
        return new Menu(
            data.name,
            data.title,
            data.routeKey,
            data.active
        );
    };

    return Menu;
})

.controller('MenuCtrl', ['Menu', '$filter', function(Menu, $filter) {
    this.menus = [
        new Menu('ACCEUIL', 'YOU', ['welcome'], true),
        new Menu('HOME', 'HOME', ['styles','home'], false),
        new Menu('STYLE', 'STYLE', ['styles','style'], false),
        new Menu('ACCESSOIRES', 'ACCESSOIRES', ['styles','accessories'], false),
        new Menu('HEURES D\'OUVERTURE', 'TO WELCOME YOU', ['openhours'], false),
        new Menu('CONTACT', 'TO SEE YOU', ['contact'], false)];

    this.currentMenu = function() {
        return $filter('filter')(this.menus, {active:true}, true)[0];
    }

    //this.on('enter_view_event').listen(enterViewEvent);


/*  void enterViewEvent(ScopeEvent e) {
    Route route = e.data[0];
    _menus.forEach((menu) => menu.activeFromRoute(route));

  }  */
}]);