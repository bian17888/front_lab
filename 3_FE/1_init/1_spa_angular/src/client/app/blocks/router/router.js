/**
 * @fileOverview
 * @author bian17888 16/5/1 09:50
 */
/* eslint-disable angular/on-watch, no-shadow */

(function () {
  'use strict';

  angular
    .module('blocks.router')
    .provider('routehelperConfig', routehelperConfig)
    .factory('routehelper', routehelper);

  routehelper.$inject = ['$location', '$rootScope', '$route', 'logger', 'routehelperConfig'];

  // Must configure via the routehelperConfigProvider
  function routehelperConfig() {
    var self = this;
    this.config = {
      // These are the properties we need to set
      // $routeProvider: undefined
      // docTitle: ''
      // resolveAlways: {ready: function(){ } }
    };

    this.$get = function () {
      return {
        config: self.config
      };
    };
  }

  function routehelper($location, $rootScope, $route, logger, routehelperConfig) {
    var handlingRouteChangeError = false;
    var routeCounts = {
      errors: 0,
      changes: 0
    };
    var routes = [];
    var $routeProvider = routehelperConfig.config.$routeProvider;

    var service = {
      configureRoutes: configureRoutes,
      getRoutes: getRoutes,
      routeCounts: routeCounts
    };

    init();

    return service;

    // ////////////////////////////////////////////////

    function configureRoutes(routes) {
      routes.forEach(function (route) {
        route.config.resolve = angular.extend(route.config.resolve || {}, routehelperConfig.config.resolveAlways);
        $routeProvider.when(route.url, route.config);
      });
      $routeProvider.otherwise({redirectTo: '/'});
    }

    function getRoutes() {
      var _routes = $route.routes;

      for (var prop in _routes) {
        if (_routes.hasOwnProperty(prop)) {
          var route = _routes[prop];
          var isRoute = !!route.title;
          if (isRoute) {
            routes.push(route);
          }
        }
      }

      return routes;
    }

    function init() {
      updateDocTitle();
      handleRoutingErrors();
    }

    function updateDocTitle() {
      $rootScope.$on('$routeChangeSuccess', function (event, current) {
        handlingRouteChangeError = false;
        routeCounts.changes++;
        $rootScope.title = routehelperConfig.config.docTitle + ' ' + (current.title || '');
      });
    }

    function handleRoutingErrors() {
      $rootScope.$on('$routeChangeError', function (event, current, previous, rejection) {
        var destination = '';
        var msg = '';

        if (handlingRouteChangeError) {
          return;
        }
        handlingRouteChangeError = true;
        routeCounts.errors++;
        destination = (current && (current.title || current.name || current.loadedTemplateUrl) ) || 'unknown target';
        msg = 'Error routing to ' + destination + '.' + (rejection.msg || '');

        logger.warning(msg, [current]);
        $location.path('/');
      });
    }
  }
})();
