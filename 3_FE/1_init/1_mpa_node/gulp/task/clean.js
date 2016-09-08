/**
 * @fileOverview
 * @author bian17888 16/4/25 10:00
 */

// third parts
var gulp = require('gulp');
var $ = require('gulp-load-plugins')({lazy: true});
var del = require('del');

// user define
var utils = require('../utils/common')();
var config = require('../config')();

/**
 * clean-** : 删除文件
 */
gulp.task('clean', function() {
  var delConfig = [].concat(config.build);
  utils.clean(delConfig);
});
gulp.task('clean-code', function() {
  utils.clean(config.code);
});
gulp.task('clean-images', function() {
  utils.clean(config.build + 'images/');
});