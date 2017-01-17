var gulp = require('gulp');
var connect = require('gulp-connect'); 

gulp.task('connect', function () {
    connect.server({
        root: './html',
        port: 10086,
        livereload: true
    });
});

gulp.task('modify', function(){
	gulp
		.src('./html/**/*')
		.pipe(connect.reload())
})

gulp.task('watch', function () {
    gulp.watch(['./html/**/*'], ['modify'])
});

gulp.task('default', ['connect', 'watch']);