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
  define(['utils'], function(utils) {

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
          .on('click', '#test_mock', testMock);
      }

      /**
       * @func testMock
       * @desc 测试 ajax mock 数据
       */
      function testMock() {
        console.log(123);
        var params = {
          type : 'post',
          url : 'api/index',
          data : {name : 'home page'}
        };
        utils.gbAjax(params, function(data){
          console.log(data.status);
        });
      }

    });

})();

