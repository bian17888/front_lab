/**
 * 用于 mock server
 */
var fs = require('fs');
var url = require('url');

/**
 * gulp 插件
 */
var gulp = require('gulp');
var exec = require('child_process').exec;
var $ = require('gulp-load-plugins')({
  lazy: true
});
var args = require('yargs').argv;
var del = require('del');
var rjs = require('requirejs');
var browserSync = require('browser-sync').create();
var config = require('./gulp.config')();
var port = config.defaultPort;

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

/**
 * task vet : 语法检测
 */
gulp.task('vet', function() {
  log('Analyzing source with JSHint and JSCS');
  return gulp
    .src(config.alljs)
    .pipe($.if(args.verbose, $.print()))
    .pipe($.jshint())
    .pipe($.jshint.reporter('jshint-stylish'))
    .pipe($.jshint.reporter('fail'))
    .pipe($.jscs())
    .pipe($.jscs.reporter())
    .pipe($.jscs.reporter('fail'));

});

/**
 * task serve-dev : start server in 'dev' environment
 */
gulp.task('serve-dev', ['init', 'watchTasks'], function() {
  serve(true /* isDev */);
});

/**
 * task serve-build : start server in 'build' environment
 */
gulp.task('serve-build', ['build'], function() {
  serve(false /* isBuild */);
});

/**
 * task init : init project
 */
gulp.task('init', ['clean', 'templates', 'stylus', 'js', 'lib', 'images', 'fonts'], function() {
  log('init project ');
});

/**
 * task watchTasks : watch src folder and compile to dist folder
 */
gulp.task('watchTasks', function() {
  log('watch tasks -> templates, stylus, js, images, fonts ');
  gulp.watch([config.htmltemplates], ['templates']);
  gulp.watch([config.stylus], ['stylus']);
  gulp.watch([config.src + 'js/**/*.js'], ['js']);
  gulp.watch([config.images], ['images']);
  gulp.watch([config.fonts], ['fonts']);
});

/**
 * task rjs : optimize css and js to www-build folder
 */
gulp.task('rjs', ['init'], function(cb) {
  log('use r.js to combine and optimize css js ');
  rjs.optimize(config.rjs, function(buildResponse) {
    console.log('build response', buildResponse);
    cb();
  }, cb);
});

/**
 * task build : build
 * todo : 增加版本号. (尝试过 : https://github.com/jamesknelson/gulp-rev-replace, 但无法解决 data-main='xx'的问题)
 */
gulp.task('build', ['rjs'], function() {
  log('build the project');
});


/**
 * task templatecache : Compile swig to HTML
 */
gulp.task('templates', ['clean-html'], function() {
  log('compiling swig --> html');
  return gulp
    .src(config.htmltemplates)
    .pipe($.swig({defaults: {cache: false}}))
    .pipe(gulp.dest(config.dist));
});
gulp.task('stylus', ['clean-css'], function() {
  log('compiling stylus --> css');
  return gulp
    .src(config.stylus)
    .pipe($.stylus())
    .pipe(gulp.dest(config.dist + 'css'));
});
gulp.task('js', ['clean-js'], function() {
  log('copy javascript ');
  return gulp
    .src(config.src + 'js/**/*.js')
    .pipe(gulp.dest(config.dist + 'js'));
});
gulp.task('lib', ['clean-lib'], function() {
  log('copy bower libs ');
  return gulp
    .src(config.src + 'lib/**/*')
    .pipe(gulp.dest(config.dist + 'lib'));
});
gulp.task('images', ['clean-images'], function() {
  log('copy and optimize images ');
  return gulp
    .src(config.images)
    .pipe($.imagemin({optimizationLevel: 4}))
    .pipe(gulp.dest(config.dist + 'images'));
});
gulp.task('fonts', ['clean-fonts'], function() {
  log('copy fonts ');
  return gulp
    .src(config.fonts)
    .pipe(gulp.dest(config.dist + 'fonts'));
});

/**
 * task clean-** : 清空 ** 文件件
 */
gulp.task('clean-html', function() {
  clean(config.html);
});
gulp.task('clean-css', function() {
  clean(config.css);
});
gulp.task('clean-js', function() {
  clean(config.dist + 'js/**/*.js');
});
gulp.task('clean-lib', function() {
  clean(config.dist + 'lib/**/*');
});
gulp.task('clean-images', function() {
  clean(config.dist + 'images/**/*');
});
gulp.task('clean-fonts', function() {
  clean(config.dist + 'fonts/**/*');
});
gulp.task('clean-jsdoc', function() {
  clean(config.jsdoc);
});
gulp.task('clean', function() {
  var delconfig = [].concat(config.dist, config.build);
  log('Cleaning : ' + $.util.colors.blue(delconfig));
  del.sync(delconfig, {force: true});
});

////////////////////////////// 分割线 //////////////////////////////
/**
 * serve : 开发环境 与 生产环境 server
 * @param isDev, true -> 开发环境
 * @returns {*}
 */
// tolight : 此处架构思想多理解下
// tolight : build 环境, 只更新 client 下文件 (静态文件); 关联 startBrowserSync 下的 options 下的 files = []
function serve(isDev) {

  if (browserSync.active) {
    return;
  }
  log('Starting browser-sync on port ' + port);

  // browserSync options
  var options = {
    server: {
      baseDir: isDev ? config.dist : config.build,
      middleware: mockServer  // mock server
    },
    port: port,
    files: isDev ? [config.dist + '**/*.*'] : [],
    ghostMode: {
      clicks: true,
      location: false,
      forms: true,
      scroll: true
    },
    injectChanges: true,
    logFileChanges: true,
    logLevel: 'info',
    logPrefix: 'gulp-patterns',
    notify: true,
    reloadDelay: 500
  };
  browserSync.init(options);
}

/**
 * @func mockServer
 * @desc 拦截 ajax 请求, 返回data/*.json 数据
 * @param {Object} req
 * @param {Object} res
 * @param {function} next
 */
function mockServer (req, res, next) {
  var path = url.parse(req.url).pathname;
  var isMock = path.indexOf('.') === 0 ? true : false ;
  
  if (isMock) {
    var data = fs.readFileSync(config.src + 'data' + path + '.json', 'utf8');
    res.setHeader("Content-Type", "application/json");
    res.end(data);
  }
  next();
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
 */
function clean(path) {
  log("Cleaning: " + $.util.colors.blue(path));
  del.sync(path, {force: true});
}
