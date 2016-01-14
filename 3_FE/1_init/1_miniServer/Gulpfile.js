var gulp = require('gulp');
var connect = require('gulp-connect'); 
var stylus = require('gulp-stylus');
var ejs = require('gulp-ejs');
var gutil = require('gulp-util');
var plumber = require('gulp-plumber');

gulp.task('stylus', function () {
	gulp.src('./stylus/*.styl')
		.pipe(plumber())
		.pipe(stylus())
		.on('error', gutil.log) 
		.pipe(gulp.dest('../html/resources/css'))
		.pipe(connect.reload());
});

gulp.task('templates', function() {
	gulp.src('./templates/*.ejs')
	 	.pipe(plumber())
	    .pipe(ejs())
	    .on('error', gutil.log) 
	    .pipe(gulp.dest('../html'));
});

gulp.task('connect', function () {
    connect.server({
        root: '../html',
        port: 9000,
        livereload: true
    });
});

gulp.task('watch', function () {
    gulp.watch('./stylus/*.styl', ['stylus']);
    gulp.watch('./templates/*.ejs', ['templates']);
});

gulp.task('default', ['stylus', 'templates', 'connect', 'watch']);

