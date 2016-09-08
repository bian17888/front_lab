/**
 * @fileOverview
 * @author bian17888 16/1/18 10:35
 */

/**
 * gulp 插件
 */
var gulp = require('gulp');
var $ = require('gulp-load-plugins')({
  lazy: true
});
var config = require('../config')();
var util = require('../util/util');
var args = require('yargs').argv;
var rjs = require('requirejs');

/**
 * task serve-build : start server in 'build' environment
 */
gulp.task('serve-build', ['build'], function() {
  util.serve(false /* isBuild */);
});

/**
 * task build : build
 * todo : 增加版本号. (尝试过 : https://github.com/jamesknelson/gulp-rev-replace, 但无法解决 data-main='xx'的问题)
 */
gulp.task('build', ['rjs'], function() {
  util.log('build the project');
});

/**
 * task rjs : optimize css and js to www-build folder
 */
gulp.task('rjs', ['vet', 'init'], function(cb) {
  util.log('use r.js to combine and optimize css js ');
  rjs.optimize(config.rjs, function(buildResponse) {
    console.log('build response', buildResponse);
    cb();
  }, cb);
});

/**
 * task vet : 语法检测
 */
gulp.task('vet', function() {
  util.log('Analyzing source with JSHint and JSCS');
  return gulp
    .src(config.alljs)
    .pipe($.if(args.verbose, $.print()))
    .pipe($.jshint())
    .pipe($.jshint.reporter('jshint-stylish'))
    .pipe($.jshint.reporter('fail'))
    .pipe($.jscs());
  //.pipe($.jscs.reporter())
  //.pipe($.jscs.reporter('fail'));

});