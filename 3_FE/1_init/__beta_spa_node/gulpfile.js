var gulp = require('gulp');
var args = require('yargs').argv;
var browserSync = require('browser-sync');
var config = require('./gulp.config')();
var del = require('del');
var path = require('path');
var _ = require('lodash');
var $ = require('gulp-load-plugins')({lazy: true});
var port = process.env.PORT || config.defaultPort;

gulp.task('help', $.taskListing);
gulp.task('default', ['help']);



/**
 * task serve-dev : start server in 'dev' environment
 */
gulp.task('serve-dev', ['inject'], function () {
  serve(true /* isDev */);
});

/**
 * task serve-build : start server in 'build' environment
 */
gulp.task('serve-build', ['optimize'], function () {
  serve(false /* isBuild */);
});

gulp.task('wiredep', function() {
  var wiredep = require('wiredep').stream;
  var options = config.getWiredepDefaultOptions;
  return gulp.src(config.index)
    .pipe(wiredep(options))
    .pipe(gulp.dest(config.client));
});

gulp.task('inject', function() {
  return gulp.src(config.index)
    .pipe($.inject(gulp.src(config.css)))
    .pipe($.inject(gulp.src(config.js)))
    .pipe(gulp.dest(config.client));
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
  };

  return $.nodemon(nodeOptions)       // tonotice : 此处无 gulp.src()
    .on('restart', function (ev) {
      log('*** nodemon restarted');
      log('files changed on restart:\n' + ev);

      setTimeout(function () {
        browserSync.notify('reloading now ...');
        browserSync.reload({stream: false});
      }, config.browserSyncReloadDelay);
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
      config.temp + '**/*.css'
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
  };

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
 * @param done
 */
function clean(path, done) {
  log("Cleaning: " + $.util.colors.blue(path));
  del(path, done);
}
