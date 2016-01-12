//Load common code that includes config, then load the app logic for this page.
(function() {

  'use strict';

  requirejs(['./common'], function() {
    requirejs(['app/mainHome']);
  });

})();
