/**
 * @file filter
 * @author bian17888 17/3/1 20:52
 */

(function () {
  'use strict';

  angular
    .module('app.core')
    .filter('userTypeTransition', userTypeTransition);

  /**
   * 用户角色的状态转换
   * @returns {Object} userTypeTransitionFilter - userTypeTransitionFilter
   */
  function userTypeTransition () {
    return userTypeTransitionFilter;
    //////////////////////////////////////////////////
    function userTypeTransitionFilter (parameters) {
      var status = {
        '0': '普通',
        '1': 'VIP',
        '2': '阿里云'
      };
      var result = status[parameters];
      return result;
    }
  }
})();

