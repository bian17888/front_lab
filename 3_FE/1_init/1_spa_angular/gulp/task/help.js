/**
 * @fileOverview
 * @author bian17888 16/4/25 10:00
 */

var fs = require('fs');
var exec = require('child_process').exec;

// third parts
var gulp = require('gulp');
var $ = require('gulp-load-plugins')({lazy: true});
var args = require('yargs').argv;

// user define
var utils = require('../utils/common')();
var config = require('../config')();

/**
 * help : 任务列表
 */
gulp.task('default', ['help']);
gulp.task('help', $.taskListing);

/**
 * vet : js语法风格 + 错误检测
 */
gulp.task('vet', function () {
  utils.log('Analyzing source with eslint .');

  return gulp
    .src(config.alljs)
    // 执行 : gulp vet --verbose ; 打印.src()文件路径
    .pipe($.if(args.verbose, $.print()))
    .pipe($.eslint())
    .pipe($.eslint.failAfterError());
});

/**
 * jsdoc : jsdoc文档
 */
gulp.task('jsdoc', function (cb) {
  utils.log('Creating docs with jsdoc .');

  var names = fs.readdirSync('./src');

  names.forEach(function (name) {
    // 当name === client时, 路径为 client/app ; 否则为server/
    var _source = ' -r ./src/' + name + (name === 'client' ? '/app' : ''),
      _destination = ' -d ./jsdoc/' + name,
    // _docConfig 包含的参数 : --readme -r -d
      _docConfig = ' --readme ./README.md ' + _source + _destination;

    exec(config.jsdoc.bin + _docConfig, function (err, stdout, stderr) {
      console.log(stdout);
      console.log(stderr);
      cb(err);
    });
  });
});
