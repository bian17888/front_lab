/**
 * 我的 Gulp.js 文档
 * @module Gulp.js
 */
/**
 * gulp 自动化工具
 * @namespace GULP
 * @class gulp_method
 */
'use strict';

/**
 * 变量声明部分
 */
var gulp = require('gulp'),
	args = require('yargs').argv,
	del = require('del'),
	$wiredep = require('wiredep').stream,
	$ = require('gulp-load-plugins')({lazy: true});

// gulp.js 配置文件
var Gconfig = require('./gulp.config')();


/**
 * task : 检查文件
 */
gulp.task('vet', function () {
	log({status : 'success', message : 'Start to analyse the code ......'});

	return gulp
		.src(Gconfig.alljs)
		// 打印文件名
		.pipe($.if(args.verbose, $.print()));
});


/**
 * task : css文件处理
 */
gulp.task('styles', ['clean-css'], function () {
	log({status : 'success', message : 'Compiling Stylus --> css'});

	return gulp
		.src(Gconfig.allstylus)
		.pipe($.plumber())
		.pipe($.stylus())
		//.on('error', errorLogger)         // 用gulp-plumber 取代
		.pipe($.autoprefixer())
		.pipe(gulp.dest(Gconfig.tmp));

});


/**
 * task : 清空 css 文件夹
 */
gulp.task('clean-css', function () {
	var file = Gconfig.tmp + '/**/*.css';

	log({status : 'success', message : 'Cleaning css :' + file});
	del(file, cleanCssFinished);

});


/**
 * task : 监控 stylus 文件改动
 */
gulp.task('watcher-css', function () {
	gulp.watch([Gconfig.allstylus], ['styles']);

});


/**
 * task : 库文件自动化载入机制
 */
gulp.task('wiredep', function () {

	var options = Gconfig.getWiredepDefaultOptions();

	return gulp
		.src(Gconfig.html)
		.pipe($wiredep(options))
		.pipe($.inject(gulp.src([Gconfig.pagecss, Gconfig.pagejs])))
		.pipe(gulp.dest(Gconfig.tmp));

});


/**
 * 日志方法
 * @method log
 * @param {Object} [status , message] status为条件, 有'success', 'error', 'normal'; message为log 信息
 */
function log(options) {

	if (options.status === 'success') {
		$.util.log($.util.colors.bgGreen.black(options.message));
	} else if (options.status === 'error') {
		$.util.log($.util.colors.bgRed.black(options.message));
	} else {
		$.util.log($.util.colors.blue(options.message));
	}

}


/**
 * 打印日志, 删除 css文件 成功
 */
function cleanCssFinished() {
	console.log('===== Delete css has successed =====');
}


/**
 * 错误信息处理 -> 用 gulp-plumber 取代
 * @method errorLogger
 */
//function errorLogger(error) {
//	log({status : 'error', message : '*** Start of Error ***'});
//	log({status : 'normal', message : error});
//	log({status : 'error', message : '*** End of Error ***'});
//	this.emit('end');
//}