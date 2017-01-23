/**
 * @fileOverview
 * @author bian17888 16/5/11 21:19
 */

(function () {
  'use strict';

  angular
    .module('app.layout')
    .controller('Shell', Shell);

  Shell.$inject = ['$timeout', 'config', 'logger', 'dataservice'];

  function Shell($timeout, config, logger, dataservice) {
    var vm = this;

    vm.title = config.appTitle;
    vm.showSplash = true;

    activate();

    // ////////////////////////////////////////////////

    /**
     * @func activate
     * @desc 初始化信息
     * @returns {void}
     */
    function activate() {
      logger.info(config.appTitle + ' loaded!', null);
      dataservice.ready().then(function () {
        hideSplash();
      });
    }

    function hideSplash() {
      $timeout(function () {
        vm.showSplash = false;
      }, 1000);
    }
  }
})();
