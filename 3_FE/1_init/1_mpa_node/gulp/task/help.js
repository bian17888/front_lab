/**
 * @fileOverview
 * @author bian17888 16/4/25 10:00
 */

// third parts
var gulp = require('gulp');
var $ = require('gulp-load-plugins')({lazy: true});
var stylish = require('jshint-stylish');
var args = require('yargs').argv;

// user define
var utils = require('./../utils/common')();
var config = require('./../config')();

/**
 * help : 任务列表
 */
gulp.task('default', ['help']);
gulp.task('help', $.taskListing);

/**
 * vet : js语法风格 + 错误检测
 */
gulp.task('vet', function(){
  utils.log('Analyzing source with jshint and jscs .');
  
  return gulp
    .src(config.js)
    .pipe($.if(args.verbose, $.print()))    // 执行 : gulp vet --verbose ; 打印.src()文件路径
    .pipe($.jscs())
    //.pipe($.jscs.reporter())
    //.pipe($.jscs.reporter('fail'))
    .pipe($.jshint())
    .pipe($.jshint.reporter(stylish))
    .pipe($.jshint.reporter('fail'));   // 任务失败, 报异常
});

