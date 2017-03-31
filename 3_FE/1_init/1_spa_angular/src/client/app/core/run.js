/**
 * @file run
 * @author bian17888 17/3/21 15:42
 */
(function () {
  'use strict';

  angular
    .module('app.core')
    .run(authLoggedIn);

  authLoggedIn.$inject = ['$rootScope'];

  /**
   * run 早于 controller directive 等
   *  可用于鉴权处理;
   *  放回 promise, 绑定在$rootScope, 用于 controller 再次使用.
   */
  /* @ngInject */
  function authLoggedIn ($rootScope) {
    // 是否登录状态
    $rootScope.login = {
      status: false,
      name: 'default_name'
    };
  }
})();

