/**
 * @fileOverview
 * @author bian17888 16/7/19 00:15
 */

define(function(require) {

  var $ = require('jquery');
  var toastr = require('toastr');

  var utils = {
    gbAjax: gbAjax,
    getCookies: getCookies,
    logger: {
      error: error,
      success: success,
    },
    pagination: pagination
  };

  return utils;

  //////////////////////////////////////////////////

  /**
   * 通用 ajax 方法
   * @param params
   * @param fnSuccess
   * @param fnError
   * @constructor
   */
  function gbAjax(params, fnSuccess, fnError) {
    $.ajax({
      type: params.type || 'GET',
      url: params.url,
      dataType: 'json',
      data: params.data || {},
      success: fnSuccess || function(data) {
        utils.logger.success('请求:' + params.url, data, '成功.');
      },
      error: fnError || function(error) {
        utils.logger.error('请求:' + params.url, error, '失败!');
      },
      beforeSend: function() {
      },
      complete: function() {
      }
    })
  }


  /**
   * @func getCookies
   * @desc 获取 cookie, 并对汉字部分 decodeURL;
   * @returns {{jingpin-all_avatar_url: *, jingpin-all_nickNameCn: string}}
   */
  function getCookies() {
    var cookies = {
      'jingpin-all_avatar_url': getCk('jingpin-all_avatar_url'),
      'jingpin-all_nickNameCn': decodeURI(getCk('jingpin-all_nickNameCn'))
    };
    return cookies;

    /**
     * @fun getCk
     * @param js 获取 cookie
     * @returns {*}
     */
    function getCk(c_name) {
      if (document.cookie.length > 0) {
        var c_start = document.cookie.indexOf(c_name + "=")
        if (c_start != -1) {
          c_start = c_start + c_name.length + 1
          var c_end = document.cookie.indexOf(";", c_start)
          if (c_end == -1) c_end = document.cookie.length
          return document.cookie.substring(c_start, c_end)
        }
      }
      return ""
    }
  }


  /**
   * @func logger
   * @desc 对 toastr + console.xx 的封装
   */
  function error(message, data, title) {
    console.error('Error : ', message, data);
    toastr.error(message, title);
  }

  function success(message, data, title) {
    console.info('Success : ', message, data);
    toastr.success(message, title);
  }


  /**
   * @func pagination
   * @desc 分页组件
   */
  function pagination() {
    $('.m-pagination-wrap form').validate({
      rules: {
        pageNumber: {
          required: true,
          isPageNumber: true
        }
      },
      messages: {
        pageNumber: {
          required: '内容不能为空'
        }
      }
    });

  }

});