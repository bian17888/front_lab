/**
 * @fileOverview
 * @author bian17888 16/4/25 10:00
 */

// third parts
var gulp = require('gulp');
var $ = require('gulp-load-plugins')({lazy: true});
var args = require('yargs').argv;
var wiredep = require('wiredep').stream;

// user define
var utils = require('../utils/common')();
var config = require('../config')();


gulp.task('templatecache', ['clean-code'], function() {
  utils.log('Creating AngularJS $templateCache');

  return gulp
    .src(config.htmltemplates)
    .pipe($.htmlmin({collapseWhitespace: true}))
    .pipe($.angularTemplatecache(
      config.templateCache.file,
      config.templateCache.options
    ))
    .pipe(gulp.dest(config.tmp));

});

/**
 * styles : 编译.styl --> .css
 */
gulp.task('styles', ['clean-styles'], function() {
  utils.log('Compiling Stylus --> Css .');

  return gulp
    .src(config.stylus)
    .pipe($.stylus())
    //.on('error', utils.errorLogger) // 优雅方案 : $.plumber()
    .pipe($.plumber())
    .pipe($.autoprefixer({browsers: ['> 0.1%', 'not ie < 9']}))
    .pipe(gulp.dest(config.tmp + 'styles/'));
});

/**
 * image : 复制并压缩图片
 */
gulp.task('images', ['clean-images'], function() {
  utils.log('Copying and compressing the images');

  return gulp
    .src(config.images)
    .pipe($.imagemin({optimizationLevel: 4}))
    .pipe(gulp.dest(config.buildContent + 'images'));
});

gulp.task('fonts', ['clean-fonts'], function() {
  utils.log('Copying the fonts');

  return gulp
    .src(config.fonts)
    .pipe(gulp.dest(config.build + 'fonts'));
});

/**
 * wiredep : install bower's lib
 */
gulp.task('wiredep', function() {
  utils.log('Wire up bower css js and app js into the html .');
  var options = config.getWiredepDefaultOptions();

  return gulp
    .src(config.index)
    .pipe(wiredep(options))
    .pipe($.inject(gulp.src(config.js), {ignorePath: '/src/client'}))
    .pipe(gulp.dest(config.client));
});

/**
 * inject : install custom css
 */
gulp.task('inject', ['wiredep', 'styles'], function() {
  utils.log('Inject Custom Css into the html .');

  return gulp
    .src(config.index)
    .pipe($.inject(gulp.src(config.css), {ignorePath: '/src/client'}))
    .pipe(gulp.dest(config.client));
});

/**
 * optimize : combine files
 */
gulp.task('optimize', ['templatecache', 'inject'], function() {
  utils.log('Optimizing the javascript, css, html .');

  var assets = $.useref.assets({searchPath: './src/client/'});
  var templateCache = config.tmp + config.templateCache.file;
  var cssFilter = $.filter('**/*.css');
  var jsLibFilter = $.filter('**/lib.js');
  var jsAppFilter = $.filter('**/app.js');

  return gulp
    .src(config.index)
    .pipe($.plumber())
    // 加入 angular templateCache.js
    .pipe($.inject(
      gulp.src(templateCache, {read : false}), {
        ignorePath: '/src/client',
        starttag: '<!-- inject:templates:{{ext}} -->'
    }))
    .pipe(assets)
    // 过滤,压缩 : css js 文件 (start)
    .pipe(cssFilter)
    .pipe($.csso())
    .pipe(cssFilter.restore())
    // 对 js 拆分 -> app.js 和 lib.js (start)
    .pipe(jsLibFilter)
    .pipe($.uglify())
    .pipe(jsLibFilter.restore())
    // angular 部分(app.js), 进行$.ngAnnotate()
    .pipe(jsAppFilter)
    .pipe($.ngAnnotate())
    .pipe($.uglify())
    .pipe(jsAppFilter.restore())
    // 对 js 拆分 -> app.js 和 lib.js (end)
    // 过滤,压缩 : css js 文件 (end)
    .pipe($.rev())    // app.js -> app-i12nv.js
    .pipe(assets.restore())
    .pipe($.useref())
    .pipe($.revReplace())   // html 文件中, 替换 src 中的 app.js -> app-i12nv.js
    .pipe(gulp.dest(config.build))
    .pipe($.rev.manifest())
    .pipe(gulp.dest(config.build));
});

/**
 * Bump the version
 * --type=pre will bump the prerelease version *.*.*-x
 * --type=patch or no flag will bump the patch version *.*.x
 * --type=minor will bump the minor version *.x.*
 * --type=major will bump the major version x.*.*
 * --version=1.2.3 will bump to a specific version and ignore other flags
 */
gulp.task('bump', function() {
  var msg = 'Bumping versions ';
  var options = {};
  var type = args.type;
  var version = args.version;

  if (version) {
    options.version = version;
    msg += 'to ' + version;
  } else {
    options.type = type;
    msg += 'for a ' + type;
  }
  utils.log(msg);

  return gulp
    .src(config.packages)
    .pipe($.print())
    .pipe($.bump(options))
    .pipe(gulp.dest(config.root));

});

/**
 * build : optimize , copy images and fonts
 */
gulp.task('build', ['optimize', 'images', 'fonts'], function() {
  utils.log('Building everything .');
});