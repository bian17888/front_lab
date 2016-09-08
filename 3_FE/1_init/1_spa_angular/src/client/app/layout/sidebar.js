/**
 * @fileOverview
 * @author bian17888 16/5/11 21:19
 */

(function() {

  'use strict';

  angular
    .module('app.layout')
    .controller('Sidebar', Sidebar);
  
  Sidebar.$inject = ['$route','routehelper'];

  function Sidebar($route, routehelper) {
    /*jshint validthis: true */
    var vm = this;
    var routes = routehelper.getRoutes();
    vm.isCurrent = isCurrent;

    activate();

    //////////////////////////////////////////////////

    /**
     * @func activate
     * @desc 初始化信息
     */
    function activate() {
      getNavRoutes();
    }

    /**
     * @func getNavRoutes
     * @desc 获取导航信息
     */
    function getNavRoutes() {
      vm.navRoutes = routes.filter(function(r){
        return r.settings && r.settings.nav;
      }).sort(function(r1, r2) {
        return r1.settings.nav - r2.settings.nav;
      });
    }

    /**
     * @func isCurrent
     * @desc 高亮当前选中栏目
     */
    function isCurrent(route) {
      if (!route.title || !$route.current || !$route.current.title) {
        return '';
      }
      var menuName = route.title;
      var isCurrentClass = $route.current.title.substr(0, menuName.length) === menuName ? 'current' : '';
      return isCurrentClass;
    }

  }
})();