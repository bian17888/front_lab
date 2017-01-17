/**
 * @fileOverview
 * @author bian17888 16/5/31 20:10
 */
/**
 * @fileOverview
 * @author bian17888 16/5/11 21:19
 */

(function() {

  'use strict';

  angular
    .module('app.dashboard')
    .controller('Dashboard', Dashboard);

  Dashboard.$inject = ['logger', 'dataservice'];

  function Dashboard(logger, dataservice) {
    var vm = this;
    vm.title = 'dashboard html !';
    vm.avengers = [];
    vm.films = [];

    activate();

    //////////////////////////////////////////////////

    function activate() {
      var promises = [getAvengers(), getFilms()];
      return dataservice.ready(promises).then(function() {
        logger.success('Dashboard View Success!');
      });
    }

    function getAvengers() {
      dataservice.getAvengers().then(function(data) {
        vm.avengers = data.data;
        return vm.avengers;
      });
    }

    function getFilms() {
      dataservice.getFilms().then(function(data) {
        vm.films = data.data;
        return vm.films;
      });
    }

  }

})();