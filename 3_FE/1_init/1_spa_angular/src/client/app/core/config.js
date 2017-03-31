/**
 * @fileOverview
 * @author bian17888 16/5/1 09:23
 */

(function () {
  'use strict';

  var core = angular.module('app.core');

  /**
   * 全局设置
   */
  var config = {
    appErrorPrefix: '[Beacon-NG Error] ', // Configure the exceptionHandler decorator
    appTitle: 'Beacon-NG',
    version: '0.0.1'
  };

  core.value('config', config);


  /**
   * config 配置 : toastr通知
   */
  core.config(toastrConfig);

  toastrConfig.$inject = ['toastr'];

  /* @ngInject */
  function toastrConfig (toastr) {
    toastr.options.timeOut = 4000;
    toastr.options.positionClass = 'toast-bottom-right';
  }


  /**
   * config 配置
   */
  core.config(configure);

  configure.$inject = ['$logProvider', '$routeProvider', 'routehelperConfigProvider', 'exceptionHandlerProvider'];

  /* @ngInject */
  function configure ($logProvider, $routeProvider, routehelperConfigProvider, exceptionHandlerProvider) {
    // turn debugging off/on (no info or warn)
    if ($logProvider.debugEnabled) {
      $logProvider.debugEnabled(true);
    }

    // Configure the common route provider
    routehelperConfigProvider.config.$routeProvider = $routeProvider;
    routehelperConfigProvider.config.docTitle = 'Beacon-NG';

    var resolveAlways = {
      /* @ngInject */
      // ready: function(dataservice) {
      //  return dataservice.ready();
      // }
      ready: ['dataservice', function (dataservice) {
        return dataservice.ready();
      }]
    };
    routehelperConfigProvider.config.resolveAlways = resolveAlways;

    // Configure the common exception handler
    exceptionHandlerProvider.configure(config.appErrorPrefix);
  }

  /**
   * http 拦截器 : 当 response 返回401时, 跳转到官网登录页
   */
  core.config(authHttpInterceptor);

  authHttpInterceptor.$inject = ['$httpProvider'];

  /* @ngInject */
  function authHttpInterceptor ($httpProvider) {
    $httpProvider.interceptors.push('auth.httpInterceptor');
  }


  /**
   * textAngular 配置
   */
  core.config(textAngular);

  textAngular.$inject = ['$provide'];

  /* @ngInject */
  function textAngular ($provide) {
    $provide.decorator('taOptions', ['$delegate', function (taOptions) {
      taOptions.toolbar = [
        ['p', 'insertLink', 'bold', 'italics', 'underline', 'strikeThrough', 'ul', 'ol'],
        ['justifyLeft', 'justifyCenter', 'justifyRight', 'indent', 'outdent'],
        ['redo', 'undo', 'clear']
      ];
      return taOptions;
    }]);
  }
})();
