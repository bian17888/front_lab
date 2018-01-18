/**
 * @fileOverview
 * @author bian17888 16/5/31 20:10
 */

(function () {
  'use strict';

  angular
    .module('app.avengers')
    .controller('Avengers', Avengers);

  Avengers.$inject = ['dataservice', 'logger'];

  /* @ngInject */
  function Avengers (dataservice, logger) {
    var vm = this;
    vm.avengers = [];
    vm.title = 'avengers html !';

    activate();

    // ////////////////////////////////////////////////

    function activate () {
      var promises = [getAvengers()];
      return dataservice.ready(promises).then(function () {
        logger.success('Activated Avengers View');
      });
    }

    function getAvengers () {
      return dataservice.getAvengers().then(function (data) {
        vm.avengers = data.data;
        return vm.avengers;
      });
    }
  }
})();
