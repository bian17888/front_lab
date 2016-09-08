/**
 * @fileOverview
 * @author bian17888 16/7/15 10:33
 */

require.config({
  baseUrl: '/app/',
  paths: {
    jquery: 'components/jquery/jquery',
    domready: 'components/domReady/domReady',
    bootstrap: 'components/bootstrap/bootstrap',
    validate: 'components/jquery-validation/jquery.validate',
    underscore: 'components/underscore/underscore',
    highcharts: 'components/highcharts/highcharts',
    toastr: 'components/toastr/toastr',
    moment: 'components/moment/moment',
    sinewaves: 'components/sine-waves/sine-waves',
    // jquery plugins
    'bootstrap-datepicker': 'plugins/bootstrap-datepicker/bootstrap-datepicker',
    'jquery-lazyload': 'plugins/jquery_lazyload/jquery.lazyload'
  },
  shim: {
    bootstrap: {
      deps: ["jquery"]
    },
    highcharts: {
      exports: "Highcharts",
      deps: ["jquery"]
    },
    underscore: {
      exports: '_'
    },
    sinewaves: {
      deps: ["jquery"]
    },
    // jquery plugins
    'bootstrap-datepicker': ['jquery'],
    'jquery-lazyload': ['jquery']
  }
});


// Main libs - Libraries and modules that will be needed on all pages of the site
define(function(require) {

  // 其他模块可直接使用, 不需要 require('xx')
  var $ = require('jquery');
  var _ = require('underscore');
  var bootstrap = require('bootstrap');
  var validate = require('validate');
  var highcharts = require('highcharts');

  // 其他模块需要require('xx')后, 才可使用
  var domReady = require('domready');
  var toastr = require('toastr');
  var moment = require('moment');

  // jquery plugins
  require('jquery-lazyload');
  require('bootstrap-datepicker');

  // load module
  var stHighcharts = require('module/Highcharts');

  domReady(function() {
    // Init highcharts
    stHighcharts.init();
    // Init common module code here
    initValidate();
    initDatepicker();
    // Init img lazyload
    $("img.lazy").lazyload({
      effect: "fadeIn"
    });

  });

  //////////////////////////////////////////////////

  /**
   * 初始化 jQuery validate 组件
   */
  function initValidate() {
    jQuery.extend(jQuery.validator.messages, {
      required: "必须填写",
      remote: "请修正此栏位",
      minlength: jQuery.validator.format("最少{0}个字符"),
      maxlength: jQuery.validator.format("最多{0}个字符"),
      rangelength: jQuery.validator.format("请输入长度为 {0} 至 {1} 之间的字符"),
      min: jQuery.validator.format("请输入不小于 {0} 的数值"),
      max: jQuery.validator.format("请输入不大于 {0} 的数值"),
      range: jQuery.validator.format("请输入 {0} 至 {1} 之间的数值"),
      email: "请输入有效的电子邮件",
      url: "请输入有效的网址",
      date: "请输入有效的日期",
      dateISO: "请输入有效的日期 (YYYY-MM-DD)",
      number: "请输入正确的数字",
      digits: "只可输入数字",
      creditcard: "请输入有效的信用卡号码",
      equalTo: "两次输入密码不一致",
      extension: "请输入有效的后缀"
    });

    // 分页 : 输入页码合理性
    jQuery.validator.addMethod("isPageNumber", function(value, element) {
      var count = $(element).data('count');
      return this.optional(element) || (value >= 1 && value <= count);
    }, "请输入正确的页码!");

    // 密码格式验证
    //jQuery.validator.addMethod("isPassword", function(value, element) {
    //  var password = /((?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20})/;
    //  return this.optional(element) || (password.test(value));
    //}, "必须包含大小写字母和数字, 长度6-20");
  }

  /**
   * 初始化 bootstrap-datepicker 组件 - 本地语言
   */
  function initDatepicker() {
    $.fn.datepicker.dates['zh-CN'] = {
      days: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"],
      daysShort: ["周日", "周一", "周二", "周三", "周四", "周五", "周六"],
      daysMin: ["日", "一", "二", "三", "四", "五", "六"],
      months: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
      monthsShort: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
      today: "今日",
      clear: "清除",
      format: "yyyy-mm-dd",
      titleFormat: "yyyy年mm月",
      weekStart: 1
    };
  }

});