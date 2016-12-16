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
  var mock = require('../../mock/api');
  var port = config.env.port;

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
   * @func changeEvent
   * @desc 显示改动文件信息
   * @param {objec} event - event
   */
  // todo : 用正则截取文件路径
  function changeEvent(event) {
    log('File : ' + event.path + ' ' + event.type);
  }

  /**
   * @func serve
   * @desc 启动 server
   * @param {boolean} isDev - 开发模式
   */
  function serve(isDev) {

    if (browserSync.active) {
      return;
    }

    log('Starting browser-sync on port : ' + port);

    if (isDev) {
      gulp.watch([config.stylus], ['styles'])
        .on('change', changeEvent);
    } else {
      gulp.watch([config.stylus, config.js, config.html], ['optimize', browserSync.reload])
        .on('change', changeEvent);
    }

    var options = {
      server: {
        baseDir: isDev ? config.client : config.build
      },
      port: port,
      files: isDev ? [
        config.client + '**/*.*',
        '!' + config.stylus,
        config.tmp + 'styles/*.css'
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
      reloadDelay: config.browserReloadDelay,
      middleware: config.env.mock === 'true' ? [mockData] : []
    }

    browserSync.init(options);

  }

  //////////////////////////////////////////////////

  function mockData(req, res, next) {
    var theUrl = url.parse(req.url);
    theUrl = theUrl.pathname.replace('/', '');
    var json = mock[theUrl];

    if (json) {
      json = json();
      json = JSON.stringify(json);
      setTimeout(function() {
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.write(json, 'utf8');
        res.end();
      }, 500)
    } else {
      next();
    }

  }

};