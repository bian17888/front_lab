/**
 * @fileOverview
 * @author bian17888 16/3/17 19:34
 */
(function() {
  "use strict";

  angular
    .module('spaApp')
    .config([
      '$stateProvider', '$urlRouterProvider',
      function($stateProvider, $urlRouterProvider) {

        $stateProvider

          // home
          .state('home', {
            url : '/home',
            data : {},
            templateUrl : 'app/controller/page/list/list.html',
            controller : 'ListController',
            controllerAs : 'vm'
          })

          // tob
          .state('tob', {
            url : '/tob/:name',
            data : {},
            templateUrl : '',
            controller : '',
            controllerAs : ''
          });
        // For any unmatched url, redirect to /state1
        $urlRouterProvider.otherwise('list');

      }
    ]);

}());