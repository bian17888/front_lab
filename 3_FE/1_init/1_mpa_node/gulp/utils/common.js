/**
 * @fileOverview
 * @author bian17888 16/4/26 09:55
 */

module.exports = function() {

  var url = require('url');
  // third parts
  var $ = require('gulp-load-plugins')({lazy: true});
  var gulp = require('gulp');
  var del = require('del');
  var browserSync = require('browser-sync').create();

  var config = require('../config')();
  var port = process.env.PORT || config.defaultPort;

  // export object
  var utils = {
    log: log,
    clean: clean,
    errorLogger: errorLogger,
    serve: serve
  };

  return utils;

  //////////////////////////////////////////////////

  /**
   * @func log
   * @param {(string|object)} mgs - 日志信息
   */
  function log(msg) {
    if (typeof(msg) === 'object') {
      for (var item in msg) {
        if (msg.hasOwnProperty(item)) {
          $.util.log($.util.colors.blue(msg[item]));
        }
      }
    } else {
      $.util.log($.util.colors.blue(msg));
    }
  }

  /**
   * @func clean
   * @desc 用同步删除, 防止异步的 bug
   * @param {(string|object)} path - 文件路径
   */
  function clean(path) {
    log('Cleaning : ' + path);
    del.sync(path);
  }

  /**
   * @func errorLogger
   * @param {object} error - 错误信息
   */
  function errorLogger(error) {
    log('*** Start of Error ***');
    log(error);
    log('*** End of Error ***');
    this.emit('end');
  }

  /**
   * @func serve
   * @desc 启动 server
   * @param {boolean} isDev - 开发模式
   */
  function serve(isDev) {

    var nodeOptions = {
      script : config.nodeServer,
      env : {
        'PORT': port,
        'MOCK': true,
        'NODE_ENV': isDev ? 'development' : 'product'
      },
      watch : [config.server]
    };

    return $.nodemon(nodeOptions)
      .on('restart', function(ev) {
        log('*** nodemon restarted');
        log('files changed on restart:\n' + ev);
        setTimeout(function() {
          browserSync.notify('reloading now ...');
          browserSync.reload({stream: false});
        }, config.browserReloadDelay);
      })
      .on('start', function() {
        log('*** nodemon started');
        startBrowserSync(isDev);
      })
      .on('crash', function() {
        log('*** nodemon crashed: script crashed for some reason');
      })
      .on('exit', function() {
        log('*** nodemon exited cleanly');
      });

  }

  /**
   * @func changeEvent
   * @desc 显示改动文件信息
   * @param {objec} event - event
   */
  // todo : 用正则截取文件路径
  function changeEvent(event) {
    log('File : ' + event.path + ' ' + event.type);
  }

  /**
   * @func startBrowserSync
   * @desc 启动 bowerSync
   * @param {boolean} isDev - true为开发环境
   */
  function startBrowserSync (isDev){
    if (browserSync.active) {
      return;
    }

    log('Starting browser-sync on port : ' + port);

    if (isDev) {
      gulp.watch([config.stylus])
        .on('change', changeEvent);
    } else {
      gulp.watch([config.allcss, config.alljs, config.html])
        .on('change', changeEvent);
    }

    var options = {
      proxy : 'localhost:' + port,
      port: config.browserPort,
      files: isDev ? [
        config.client + '**/*.*',
        '!' + config.stylus
      ] : [],
      ghostMode: {
        clicks: true,
        location: false,
        forms: true,
        scroll: true
      },
      open: true,
      injectChanges: true,
      logFileChanges: true,
      logLevel: 'debug',
      logPrefix: 'sandtable',
      notify: true,
      reloadDelay: 1000 // 1000
    }

    browserSync.init(options);
  }

};