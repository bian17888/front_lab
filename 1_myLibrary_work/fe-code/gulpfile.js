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
	browserSync = require('browser-sync').create(),
	$ = require('gulp-load-plugins')({lazy: true});

// gulp.js 配置文件
var Gconfig = require('./gulp.config')();

var port = process.env.NODE_ENV || Gconfig.defaultPort;

/**
 * task : 检查文件
 */
gulp.task('vet', function () {
	log({status: 'success', message: 'Start to analyse the code ......'});

	return gulp
		.src(Gconfig.alljs)
		// 打印文件名
		.pipe($.if(args.verbose, $.print()));
});


/**
 * task : css文件处理
 */
gulp.task('styles', ['clean-css'], function () {
	log({status: 'success', message: 'Compiling Stylus --> css'});

	return gulp
		.src(Gconfig.allstylus)
		.pipe($.plumber())
		.pipe($.stylus())
		//.on('error', errorLogger)         // 用gulp-plumber 取代
		.pipe($.autoprefixer())
		.pipe(gulp.dest(Gconfig.tmp))

});


/**
 * task : 清空 css 文件夹
 */
gulp.task('clean-css', function () {
	var file = Gconfig.tmp + '/**/*.css';

	log({status: 'success', message: 'Cleaning css :' + file});
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
gulp.task('wiredep', ['styles'], function () {

	var options = Gconfig.getWiredepDefaultOptions();

	return gulp
		.src(Gconfig.html)
		.pipe($wiredep(options))
		.pipe($.inject(gulp.src([Gconfig.pagecss, Gconfig.pagejs])))
		.pipe(gulp.dest(Gconfig.tmp));
});


/**
 * task : server dev
 */
gulp.task('server-dev', ['wiredep'], function () {
	var isDev = true,
		statusSuccess = 'success',
		statusError = 'error',
		statusNormal = 'normal';

	var nodeOptions = {
		script   : Gconfig.nodeServer,
		delayTime: 1,
		env      : {
			'PORT'    : port,
			'NODE_ENV': isDev ? 'dev' : 'build'
		},
		watch    : [Gconfig.server]
	};
	$.nodemon(nodeOptions)
		.on('start', function () {
			log({status: statusSuccess, message: '*** nodemon started'});
			// 浏览器自动刷新
			// fixme : 稍后做
			//startBrowserSync();
		})
		.on('restart', function (ev) {
			log({status: statusSuccess, message: '*** nodemon restarted'});
			log({status: statusSuccess, message: 'files changed on restarted : \n' + ev});
		})
		.on('crash', function () {
			log({status: statusError, message: '*** nodemon crashed : script crashed for some reason'});
		})
		.on('exit', function () {
			log({status: statusNormal, message: '*** nodemon exited cleanly '});
		});

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
 * 浏览器自动刷新
 * @method startBrowserSync
 * fixme : 目前不能浏览器同步, 稍后修复
 */
function startBrowserSync() {

	if (browserSync.active) {
		log({status: 'error', message: '==================== : ' + browserSync.active});
		browserSync.reload();
		return ;
	}

	log({status: 'success', message: 'Starting browser-sync on port : ' + port});


	var options = {
		proxy         : 'localhost:' + port,
		port          : 3000,
		files         : [Gconfig.tmp + '**/*.*'],
		ghostMode     : {
			clicks: true,
			forms : true,
			scroll: true
		},
		injectChanges : true,
		logFileChanges: true,
		logLevel      : "debug",
		logPrefix     : "gulp-patterns",
		notify        : true
	};

	browserSync.init(options);


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