/**
 * @fileOverview
 * @author bian17888 16/1/18 10:52
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

/**
 * task init : init project
 */
gulp.task('init', ['clean', 'templates', 'stylus', 'js', 'lib', 'images', 'fonts'], function() {
  util.log('init project ');
});

/**
 * task templatecache : Compile swig to HTML
 */
gulp.task('templates', ['clean-html'], function() {
  util.log('compiling swig --> html');
  return gulp
    .src(config.htmltemplates)
    .pipe($.swig({defaults: {cache: false}}))
    .pipe(gulp.dest(config.dist));
});
gulp.task('stylus', ['clean-css'], function() {
  util.log('compiling stylus --> css');
  return gulp
    .src(config.stylus)
    .pipe($.stylus())
    .pipe(gulp.dest(config.dist + 'css'));
});
gulp.task('js', ['clean-js'], function() {
  util.log('copy javascript ');
  return gulp
    .src(config.src + 'js/**/*.js')
    .pipe(gulp.dest(config.dist + 'js'));
});
gulp.task('lib', ['clean-lib'], function() {
  util.log('copy bower libs ');
  return gulp
    .src(config.src + 'lib/**/*')
    .pipe(gulp.dest(config.dist + 'lib'));
});
gulp.task('images', ['clean-images'], function() {
  util.log('copy and optimize images ');
  return gulp
    .src(config.images)
    .pipe($.imagemin({optimizationLevel: 4}))
    .pipe(gulp.dest(config.dist + 'images'));
});
gulp.task('fonts', ['clean-fonts'], function() {
  util.log('copy fonts ');
  return gulp
    .src(config.fonts)
    .pipe(gulp.dest(config.dist + 'fonts'));
});