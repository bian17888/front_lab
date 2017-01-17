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
var exec = require('child_process').exec;

/**
 * start
 */
gulp.task('default', ['help']);
gulp.task('help', $.taskListing);
gulp.task('jsdoc', ['clean-jsdoc'], function(cb) {
  exec(config.shell.jsdoc, function(err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    cb(err);
  });
});