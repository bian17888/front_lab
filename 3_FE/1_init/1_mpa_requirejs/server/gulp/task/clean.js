/**
 * @fileOverview
 * @author bian17888 16/1/15 18:22
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
var del = require('del');


/**
 * task clean-** : 清空 ** 文件件
 */
gulp.task('clean-html', function() {
  util.clean(config.html);
});
gulp.task('clean-css', function() {
  util.clean(config.css);
});
gulp.task('clean-js', function() {
  util.clean(config.dist + 'js/**/*.js');
});
gulp.task('clean-lib', function() {
  util.clean(config.dist + 'lib/**/*');
});
gulp.task('clean-images', function() {
  util.clean(config.dist + 'images/**/*');
});
gulp.task('clean-fonts', function() {
  util.clean(config.dist + 'fonts/**/*');
});
gulp.task('clean-jsdoc', function() {
  util.clean(config.jsdoc);
});
gulp.task('clean', function() {
  var delconfig = [].concat(config.dist, config.build, config.jsdoc);
  util.log('Cleaning : ' + $.util.colors.blue(delconfig));
  del.sync(delconfig, {force: true});
});