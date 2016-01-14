/**
 * @fileOverview requirejs 配置文件
 * @author bian17888
 */

requirejs.config({
  baseUrl: 'lib',
  paths: {
    app: '../js/app',
    page: '../js/page',
    utils: '../js/app/common/utils',
    init: '../js/app/common/init',
    /*
     * third libs : AMD
     * */
    jquery: 'jquery/dist/jquery',
    validate: 'jquery-validation/dist/jquery.validate',
    'jquery.ui': 'jquery-ui/jquery-ui',
    /*
     * third libs : not AMD
     * */
    underscore: 'underscore/underscore',
  },
  shim: {
    'underscore': {exports: '_'}
  }
});
