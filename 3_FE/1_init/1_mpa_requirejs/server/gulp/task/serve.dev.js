/**
 * @fileOverview
 * @author bian17888 16/1/18 10:35
 */

/**
 * gulp 插件
 */
var gulp = require('gulp');
var config = require('../config')();
var util = require('../util/util');

/**
 * task serve-dev : start server in 'dev' environment
 */
gulp.task('serve-dev', ['init', 'watchTasks'], function() {
  util.serve(true /* isDev */);
});

/**
 * task watchTasks : watch src folder and compile to dist folder
 */
gulp.task('watchTasks', function() {
  util.log('watch tasks -> templates, stylus, js, images, fonts ');
  gulp.watch([config.htmltemplates], ['templates']);
  gulp.watch([config.stylus], ['stylus']);
  gulp.watch([config.src + 'js/**/*.js'], ['js']);
  gulp.watch([config.images], ['images']);
  gulp.watch([config.fonts], ['fonts']);
});