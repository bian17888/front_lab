/**
 * @fileOverview
 * @author bian17888 16/4/27 07:40
 */

(function () {
  'use strict';

  angular.module('app', [
    /* Shared modules */
    'app.core',
    'app.widgets',

    /*
     * Feature areas
     */
    'app.avengers',
    'app.dashboard',
    'app.layout'
  ]);
})();
