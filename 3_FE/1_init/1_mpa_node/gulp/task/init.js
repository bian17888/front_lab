/**
 * @fileOverview
 * @author bian17888 16/4/25 10:00
 */

// third parts
var gulp = require('gulp');
var $ = require('gulp-load-plugins')({lazy: true});
var args = require('yargs').argv;
var exec = require('child_process').exec;
// user define
var utils = require('../utils/common')();
var config = require('../config')();


/**
 * image : 压缩并复制图片
 */
gulp.task('images', ['clean-images'], function() {
  utils.log('Copying and compressing the images');

  return gulp
    .src(config.images)
    .pipe($.imagemin({optimizationLevel: 4}))
    .pipe(gulp.dest(config.build + 'images'));
});

/**
 * optimize : combine files
 * reference :
 *  http://stackoverflow.com/questions/28999621/using-requirejs-optimizer-node-module-with-gulp
 *  http://requirejs.org/docs/optimization.html
 * tolight : 先 npm install -g requirejs , 才能执行 r.js || node r.js -o build.js 不可行
 */
gulp.task('optimize', ['clean-code'], function(cb) {
  utils.log('Optimizing the javascript, css with r.js ');

  exec('cd tools && r.js -o build.js', function (err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    cb(err);
  });
});

/**
 * build : optimize , copp images
 */
gulp.task('build', ['optimize', 'images'], function() {
  utils.log('Building everything .');
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