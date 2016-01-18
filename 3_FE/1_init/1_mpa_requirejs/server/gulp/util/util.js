/**
 * @fileOverview
 * @author bian17888 16/1/18 10:11
 */

/**
 * 用于 mock server
 */
var fs = require('fs');
var url = require('url');

/**
 * gulp 插件
 */
var gulp = require('gulp');
var $ = require('gulp-load-plugins')({
  lazy: true
});
var del = require('del');
var browserSync = require('browser-sync').create();
var config = require('../config')();
var port = config.defaultPort;


/**
 * serve : 开发环境 与 生产环境 server
 * @param isDev, true -> 开发环境
 */
function serve(isDev) {

  if (browserSync.active) {
    return;
  }
  log('Starting browser-sync on port ' + port);

  // browserSync options
  var options = {
    server: {
      baseDir: isDev ? config.dist : config.build,
      middleware: mockServer  // mock server
    },
    port: port,
    files: isDev ? [config.dist + '**/*.*'] : [],
    ghostMode: {
      clicks: true,
      location: false,
      forms: true,
      scroll: true
    },
    injectChanges: true,
    logFileChanges: true,
    logLevel: 'info',
    logPrefix: 'gulp-patterns',
    notify: true,
    reloadDelay: 500
  };
  browserSync.init(options);
}

/**
 * @func mockServer
 * @desc 拦截 ajax 请求, 返回data/*.json 数据
 * @param {Object} req
 * @param {Object} res
 * @param {function} next
 */
function mockServer (req, res, next) {
  var path = url.parse(req.url).pathname;
  // tolight : 目前为/api/xx 路径的假数据, 这块可根据具体接口定义, 进行相应的过滤条件修改, 可扩展为正则过滤
  var isMock = path.indexOf('/api/') === 0 ? true : false ;
  if (isMock) {

    // 捕获异常
    try {
      var data = fs.readFileSync(config.src + 'data' + path + '.json', 'utf8');
      res.setHeader("Content-Type", "application/json");
      res.end(data);
    } catch (e){
      var data = {
        "status" : 99,
        "data" : {},
        "message" : 'data' + path + '.json' + '文件不存在!'
      };
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify(data));
      // 再次抛出异常, 以便测试可以检测到
      throw new Error(e);
    }

  }
  next();
}

/**
 * log 工具函数
 * @param msg
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
 * clean 删除文件
 * @param path
 */
function clean(path) {
  log("Cleaning: " + $.util.colors.blue(path));
  del.sync(path, {force: true});
}


module.exports = {
  serve : serve,
  mockServer : mockServer,
  log : log,
  clean : clean
};