/**
 * Created by bian17888 on 16/1/4.
 */

(function() {

  'use strict';

  define(['utils'], function() {

    $(function() {

      init();

      /**
       * 初始化页面
       */
      function init() {
        bindEvent();
      }

      function bindEvent() {
        $('.home-wrap')
          .on('click', '.r-btn-close', xxFn);
      }

      /**
       * xxFn
       * @param params
       */
      function xxFn(params) {
        // to do some thing
      }

    });
  });

})();

