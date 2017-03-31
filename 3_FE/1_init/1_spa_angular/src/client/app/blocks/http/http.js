/**
 * @fileOverview
 * @author bian17888 16/5/31 14:05
 */

(function () {
  'use strict';

  angular
    .module('blocks.http')
    .factory('auth.httpInterceptor', authHttpInterceptor);

  authHttpInterceptor.$inject = ['$q', '$rootScope', '$location', '$window'];

  /* @ngInject */
  function authHttpInterceptor ($q, $rootScope, $location, $window) {
    var service = {
      'responseError': responseError
    };

    return service;

    // ////////////////////////////////////////////////

    function responseError (rejection) {
      if (rejection.status === 401) {
        var url = $location.protocol() + '://' + $location.host() + $location.path();
        var callbackUrl = $rootScope.login.loginAliyun + url;
        $window.location.href = callbackUrl;
      }
      return $q.reject(rejection);
    }
  }
})();
