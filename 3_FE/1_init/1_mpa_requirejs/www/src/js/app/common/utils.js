/**
 * @fileOverview 工具类
 * @author bian17888
 */
(function() {

  'use strict';

  /**
   * 工具类模块 :
   * 包含封装的 ajax方法, tip 弹窗.
   * @module common/utils
   * @see module:common/init
   */
  define(['init'], function() {

    /**
     * @func gbAjax
     * @desc 通用 ajax 方法.
     * @param {Object} params - ajax configs
     * @param {function} fnOk - success回调函数
     */
    function gbAjax(params, fnOk) {
      $.ajax({
        type: params.type || 'get',
        url: params.url,
        dataType: 'json',
        data: params.data || {},
        success: fnOk || function(data) {
          console.log(data);
        },
        error: function() {
          console.log('ajax error!');
        },
        beforeSend: function() {
          var dom = '<div style="opacity: 0" class="ajax-loading-wrap"><img class="ajax-loading" src="/static/images/loading.gif" /></div>';
          $('#' + params.id).html(dom);
          $('.ajax-loading-wrap').animate({'opacity': 1}, 1500);
        },
        complete: function() {
          $('.ajax-loading-wrap').remove();
        }
      });
    }

    /**
     * @func infoTip
     * @desc 顶部 Tip 弹窗 : 用于提示错误信息
     * @param {string} className -  弹窗类型(error-tip. success-tip)
     * @param {string} msg - 弹窗信息
     */
    function infoTip(className, msg) {
      var dom = '<div class="' + className + '"></div>',
        $className = $('.' + className);

      $('body').append(dom);

      $className.text(msg);
      $className.slideDown();
      setTimeout(function() {
        $className.slideUp(function() {
          $className.remove();
        });
      }, 3000);
    }

    return {
      gbAjax: gbAjax,
      infoTip: infoTip
    };

  });

})();

