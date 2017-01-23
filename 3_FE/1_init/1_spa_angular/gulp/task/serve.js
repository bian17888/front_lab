/**
 * @fileOverview
 * @author bian17888 16/5/5 07:25
 */

// third parts
var gulp = require('gulp');

// user define
var utils = require('../utils/common')();

gulp.task('serve-dev', ['inject'], function () {
  utils.serve(true /* isDev */);
});

gulp.task('serve-build', ['build'], function () {
  utils.serve(false /* isDev */);
});
