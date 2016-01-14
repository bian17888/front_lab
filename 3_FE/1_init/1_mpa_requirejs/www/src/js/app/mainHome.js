/**
 * @fileOverview 首页
 * @author bian17888
 */

(function() {

  'use strict';

  /**
   * 首页
   * @module home
   * @see module:common/utils
   */
  define('home', ['utils'], function() {

    $(function() {

      init();

      /**
       * @func init
       * @desc 本页面初始化
       */
      function init() {
        bindEvent();
      }

      /**
       * @func bindEvent
       * @desc 本页面事件绑定
       */
      function bindEvent() {
        $('.home-wrap')
          .on('click', '.r-btn-close', xxFn);
      }

      /**
       * @func xxFn
       * @desc xxFn 描述
       * @param {Object} params - 参数描述
       */
      function xxFn(params) {
        // to do some thing
      }

    });
  });

})();

