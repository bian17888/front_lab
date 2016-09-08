/**
 * @fileOverview
 * @author bian17888 16/5/11 21:19
 */

(function() {

  'use strict';

  angular
    .module('app.layout')
    .controller('Shell', Shell);

  Shell.$inject = ['$timeout', 'config', 'logger'];

  function Shell($timeout, config, logger) {
    /*jshint validthis: true */
    var vm = this;

    vm.title = config.appTitle;
    vm.busyMessage = 'Please wait ...';
    vm.isBusy = true;   //todo : 确定和哪有关联?

    activate();

    //////////////////////////////////////////////////

    /**
     * @func activate
     * @desc 初始化信息
     */
    function activate() {
      logger.success(config.appTitle + ' loaded!', null);
//    Using a resolver on all routes or dataservice.ready in every controller
//      dataservice.ready().then(function() {
//        hideSplash();
//      });
    }
  }
})();