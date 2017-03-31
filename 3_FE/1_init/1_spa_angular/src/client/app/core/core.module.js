/**
 * @fileOverview
 * @author bian17888 16/5/1 09:23
 */

(function () {
  'use strict';

  angular
    .module('app.core', [
      /* Angular modules */
      'ngAnimate', 'ngSanitize',

      /* Cross-app modules */
      'blocks.logger', 'blocks.router', 'blocks.exception', 'blocks.http',

      /* 3rd-party modules */
      'ngplus', 'ui.bootstrap', 'textAngular', 'ngTagsInput', 'ngFileUpload'
    ]);
})();
