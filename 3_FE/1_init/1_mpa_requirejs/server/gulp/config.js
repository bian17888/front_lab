/**
 * Created by bian17888 on 15/12/6.
 */
//Load common code that includes config, then load the app logic for this page.
(function() {

  'use strict';

  module.exports = function() {
    var root = '../www/';
    var src = root + 'src/';
    var dist = root + 'dist/';
    var build = '../www-build/';
    var tmp = build + '.tmp/';

    var config = {
      src: src,
      dist: dist,
      build: build,
      tmp: tmp,
      /**
       * Files paths
       */
      htmltemplates: [
        src + '**/*.html',
        '!' + src + 'data/**/*.html'
      ],
      html: dist + '**/*.html',
      stylus: src + 'css/**/*.styl',
      css: dist + 'css/**/*.css',
      alljs: src + 'js/**/*.js',
      images: src + 'images/**/*.*',
      fonts: [
        src + 'lib/font-awesome/fonts/**/*.*',
        src + 'fonts/**/*.*'
      ],
      lib: src + 'lib/**/*.*',
      /**
       * r.js config
       */
      rjs: {
        appDir: dist,
        baseUrl: 'lib',
        dir: build,
        mainConfigFile: dist + 'js/page/common.js',
        paths: {
          'utils': '../js/app/common/utils',
          'app': '../js/app',
          'page': '../js/page'
        },
        optimizeCss: 'standard',
        optimize: 'uglify2',
        // 如果设置为true，在输出目录将会删除掉已经合并了的文件
        removeCombined: true,
        modules: [
          //First set up the common build layer.
          {
            //module names are relative to baseUrl
            name: 'page/common',
            include: ['utils']
          },
          {
            name: 'page/home',
            include: ['app/mainHome'],
            exclude: ['utils', 'page/common']
          },
          {
            name: 'page/login',
            include: ['app/mainLogin'],
            exclude: ['utils', 'page/common']
          }
        ]
      },
      jsdoc: root + 'docs/',
      /**
       * Shell
       */
      shell: {
        jsdoc: 'jsdoc -c jsdoc.config.json'
      },
      /**
       * gulp settings
       */
      defaultPort: 3000
      /**
       * browser sync
       */
      //browserSyncReloadDelay : 1000,

      /**
       * Bower and NPM locations
       */
      //bower: {
      //    json: require('./bower.json'),
      //    directory: './bower_components/',
      //    ignorePath: '../..'
      //},
      //packages : [
      //    './package.json',
      //    './bower.json'
      //],
    };

    /**
     * getWiredepDefaultOptions : 获取 wiredep 默认设置
     * @returns {{bowerJson: *, directory: string, ignorePath: string}}
     */
    config.getWiredepDefaultOptions = function() {
      //var options = {
      //    bowerJson: config.bower.json,
      //    directory: config.bower.directory,
      //    ignorePath: config.bower.ignorePath
      //};
      //return options;
    };

    return config;

  };

})();

