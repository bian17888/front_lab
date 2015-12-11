/**
 * Created by bian17888 on 15/12/6.
 */

var gulp = require('gulp');
var args = require('yargs').argv;
var $ = require('gulp-load-plugins')({lazy: true});
var del = require('del');
var browserSync = require('browser-sync');
var config = require('./gulp.config')();


var port = process.env.PORT || config.defaultPort;

/**
 * task help : list all tasks
 */
gulp.task('help', $.taskListing);
gulp.task('default', ['help']);

/**
 * task vet : 语法检测
 */
gulp.task('vet', function () {
	log('Analyzing source with JSHint and JSCS');
	return gulp
		.src(config.alljs)
		.pipe($.if(args.verbose, $.print()))
		.pipe($.jshint())
		.pipe($.jscs())
		.pipe($.jshint.reporter('jshint-stylish'))
		.pipe($.jshint.reporter('fail'));
});

/**
 * task styles : css编译
 */
gulp.task('styles', ['clean-styles'], function () {
	log('Compiling Less --> CSS');

	return gulp
		.src(config.less)
		.pipe($.plumber())
		.pipe($.less())
		.pipe($.autoprefixer({browsers: ['last 2 version', '> 5%']}))
		.pipe(gulp.dest(config.temp));
});

gulp.task('less-watcher', function () {
	gulp.watch([config.less], ['styles']);
})

/**
 * task fonts : copy fonts
 */
gulp.task('fonts', ['clean-fonts'], function () {
	log('Copying fonts');

	return gulp
		.src(config.fonts)
		.pipe(gulp.dest(config.build + 'fonts'))
})

/**
 * task images : copy and compress the images
 */
gulp.task('images', ['clean-images'], function () {
	log('Copying images');

	return gulp
		.src(config.images)
		.pipe($.imagemin({optimizationLevel: 4}))
		.pipe(gulp.dest(config.build + 'images'))
})

/**
 * task wiredep & inject : bower and inject into html
 */
gulp.task('wiredep', function () {
	log('Wire up the bower into the html');

	var wiredep = require('wiredep').stream;
	var options = config.getWiredepDefaultOptions();

	return gulp
		.src(config.index)
		.pipe(wiredep(options))
		.pipe(gulp.dest(config.client))
})

gulp.task('inject', ['wiredep', 'styles', 'templatecache'], function () {
	log('Wire up the into the html, and call wiredep ');

	return gulp
		.src(config.index)
		.pipe($.inject(gulp.src(config.css)))
		.pipe($.inject(gulp.src(config.js)))
		.pipe(gulp.dest(config.client))
})

/**
 * task templatecache : angular html cache
 */
gulp.task('templatecache', ['clean-code'], function () {
	log('Creating Angular $templateCache');

	return gulp
		.src(config.htmltemplates)
		.pipe($.minifyHtml({empty: true}))
		.pipe($.angularTemplatecache(
			config.templateCache.file,
			config.templateCache.options
		))
		.pipe(gulp.dest(config.temp))
})

/**
 * task optimize : combine the files ( css, js, template_html)
 */
gulp.task('optimize', ['inject', 'fonts', 'images'], function () {
	log('Optimizing the javascript, css, html');

	var templateCache = config.temp + config.templateCache.file;
	var assets = $.useref.assets({searchPath: './'});
	var cssfilter = $.filter('**/*.css');
	var jsLibfilter = $.filter('./lib.js');
	var jsAppfilter = $.filter('./app.js');


	// tilight : 注意,
	return gulp
		.src(config.index)
		.pipe($.plumber())
		// tolight : 注意此处$.inject()的用法
		.pipe($.inject(gulp.src(templateCache, {read: false}), {
			starttag: '<!-- inject:templates:js -->'
		}))
		.pipe(assets)
		// tolight : assets 要放在压缩 css, js 之前
		.pipe(cssfilter)
		.pipe($.csso())
		.pipe(cssfilter.restore())
		.pipe(jsLibfilter)
		.pipe($.uglify())
		.pipe(jsLibfilter.restore())
		.pipe(jsAppfilter)
		.pipe($.ngAnnotate())
		.pipe($.uglify())
		.pipe(jsAppfilter.restore())
		.pipe($.rev())      // app.js -> app-xj1122.js
		.pipe(assets.restore())
		.pipe($.useref())
		.pipe($.revReplace())   // modify index.html : src="app.js" -> src="app-xj1122.js"
		.pipe(gulp.dest(config.build))
		.pipe($.rev.manifest())
		.pipe(gulp.dest(config.build))
})

/**
 * task serve-dev : start server in 'dev' environment
 */
gulp.task('serve-dev', ['inject'], function () {
	serve(true /* isDev */);
})

/**
 * task serve-build : start server in 'build' environment
 */
gulp.task('serve-build', ['optimize'], function () {
	serve(false /* isBuild */);
})

/**
 * Bump the version
 * --type=pre will bump the prerelease version *.*.*-x
 * --type=patch or no flag will bump the patch version *.*.x
 * --type=minor will bump the minor version *.x.*
 * --type=major will bump the major version x.*.*
 * --version=1.2.3 will bump to a specific version and ignore other flags
 */
gulp.task('bump',function(){
	var options = {};
	var type = args.type;
	var version = args.version;
	var msg = 'Bumping versions ';

	if (version) {
		options.version = version;
		msg += ' to ' + version;
	} else {
		options.type = type;
		msg += ' for a ' + type
	}

	log(msg);

	return gulp
		.src(config.packages)
		.pipe($.print())
		.pipe($.bump(options))
		.pipe(gulp.dest(config.root));
})

/**
 * task clean-** : 清空 ** 文件件
 */
gulp.task('clean', function (done) {
	var delconfig = [].concat(config.build, config.temp);
	log('Cleaning : ' + $.util.colors.blue(delconfig))
	del(delconfig, done)
});

gulp.task('clean-styles', function (done) {
	clean(config.temp + '**/*.css', done)
});

gulp.task('clean-images', function (done) {
	clean(config.build + 'images/**/*.*', done)
});

gulp.task('clean-fonts', function (done) {
	clean(config.build + 'fonts/**/*.*', done)
});

gulp.task('clean-code', function (done) {
	var files = [].concat(
		config.temp + '**/*.js',
		config.build + '**/*.html',
		config.build + 'js/**/*.js'
	)
	clean(files, done);
});

//////////////////////////////////////////////////

/**
 * serve : 开发环境 与 生产环境 server
 * @param isDev, true -> 开发环境
 * @returns {*}
 */
// tolight : 此处架构思想多理解下
// tolight : build 环境, 只更新 client 下文件 (静态文件); 关联 startBrowserSync 下的 options 下的 files = []
function serve(isDev) {

	var nodeOptions = {
		script   : config.nodeServer,
		delayTime: 1,
		env      : {
			'PORT'    : port,
			'NODE_ENV': isDev ? 'dev' : 'build'
		},
		watch    : [config.server]
	}

	return $.nodemon(nodeOptions)       // tonotice : 此处无 gulp.src()
		.on('restart', function (ev) {
			log('*** nodemon restarted');
			log('files changed on restart:\n' + ev);

			// tolight : 设置个延迟函数, 配合 nodemon 重启
			setTimeout(function () {
				browserSync.notify('reloading now ...');
				browserSync.reload({stream: false});
			}, config.browserSyncReloadDelay)
		})
		.on('start', function () {
			log('*** nodemon started');
			startBrowserSync(isDev);
		})
		.on('crash', function () {
			log('*** nodemon crashed: script crashed for some reason');
		})
		.on('exit', function () {
			log('*** nodemon exited cleanly');
		});
}

/**
 * startBrowserSync : 浏览器同步
 */
function startBrowserSync(isDev) {

	if (browserSync.active) {
		return;
	}

	log('Starting browser-sync on port ' + port);

	if (isDev) {
		gulp.watch([config.less], ['styles'])
			.on('change', function(event) { changeEvent(event); });
	} else {
		gulp.watch([config.less, config.js, config.html], ['optimize', browserSync.reload])
			.on('change', function(event) { changeEvent(event); });
	}

	var options = {
		proxy         : 'localhost:' + port,
		port          : 3000,
		files         : isDev ? [
			config.client + '**/*',
			'!' + config.less,
			config.temp + '**/*.css'        // tolight : css 文件单独处理, 页面可局部刷新 (socket.io)
		] : [],
		ghostMode     : {
			clicks  : true,
			location: false,
			forms   : true,
			scroll  : true
		},
		injectChanges : true,
		logFileChanges: true,
		logLevel      : 'debug',
		logPrefix     : 'gulp-patterns',
		notify        : true,
		reloadDelay   : 0
	}

	browserSync(options);
}

/**
 * changeEvent : log 出修改的css 文件
 * @param event
 */
function changeEvent(event) {
	var srcPattern = new RegExp('/.*(?=/' + config.source + ')/');
	log('File ' + event.path.replace(srcPattern, '') + ' ' + event.type);
}

/**
 * log 工具函数
 * @param msg
 */
function log(msg) {
	if (typeof(msg) === 'object') {
		for (var item in msg) {
			if (msg.hasOwnProperty(item)) {
				$.util.log($.util.colors.blue(msg[item]));
			}
		}
	} else {
		$.util.log($.util.colors.blue(msg));
	}
}

/**
 * clean 删除文件
 * @param path
 * @param done, tolight : 回调函数 (重点!!, 异步中, 防止未删除完就执行其他动作)
 */
function clean(path, done) {
	log("Cleaning: " + $.util.colors.blue(path));
	del(path, done)
}
