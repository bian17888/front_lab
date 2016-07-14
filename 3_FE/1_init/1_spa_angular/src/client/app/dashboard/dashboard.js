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

  function Dashboard() {
    var vm = this;

    vm.items = [
      {
        id: 0,
        name: 'bb'
      },
      {
        id: 1,
        name: 'cc'
      },
      {
        id: 0,
        name: 'bb'
      }
    ]
  }

})();