/**
 * @file utils
 * @author bian17888 17/3/13 17:09
 */
(function () {
  'use strict';

  angular
    .module('app.core')
    .factory('utils', utils);

  utils.$inject = [];

  /* @ngInject */
  function utils () {
    var service = {
      breadcrumb: breadcrumb
    };
    return service;

    ////////////////

    /**
     * 面包屑导航
     * @param {Object[]} arr - 当前标题
     * @returns {Object} navs - 面包屑导航对象
     */
    function breadcrumb (arr) {
      var navs = [
        {
          'title': 'Connect首页',
          'href': '/',
          'active': false
        }
      ];
      var result = navs.concat(arr);
      return result;
    }
  }
})();

