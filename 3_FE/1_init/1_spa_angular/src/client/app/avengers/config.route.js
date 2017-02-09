/**
 * @fileOverview
 * @author bian17888 16/5/11 21:19
 */

(function () {
  'use strict';

  angular
    .module('app.avengers')
    .run(appRun);

  appRun.$inject = ['routehelper'];

  /* @ngInject */
  function appRun(routehelper) {
    routehelper.configureRoutes(getRoutes());
  }

  function getRoutes() {
    return [
      {
        url: '/avengers',
        config: {
          templateUrl: 'app/avengers/avengers.html',
          controller: 'Avengers',
          controllerAs: 'vm',
          title: 'avengers',
          settings: {
            nav: 2,
            content: '<i class="fa fa-lock"></i> Avengers'
          }
        }
      }
    ];
  }
})();
