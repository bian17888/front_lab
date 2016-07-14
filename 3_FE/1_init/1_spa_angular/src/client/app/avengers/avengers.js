/**
 * @fileOverview
 * @author bian17888 16/5/31 20:10
 */

(function() {

  'use strict';

  angular
    .module('app.avengers')
    .controller('Avengers', Avengers);

  Avengers.$inject = ['logger'];

  /* @ngInject */
  function Avengers(logger) {
    var vm = this;

    vm.text = 'avengers html !';

    logger.success(' avengers page !');

  }

})();