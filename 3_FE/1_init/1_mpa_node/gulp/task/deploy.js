'use strict';

var fs = require('fs');
var gulp = require('gulp');
var GulpSSH = require('gulp-ssh');
var exec = require('child_process').exec;
var config = require('../config');

var sshConfig = {
  host: '10.101.88.14',
  port: 22,
  username: 'zhuzhen.bk',
  privateKey: fs.readFileSync('/Users/bian17888/.ssh/id_rsa')
};
var gulpSSH = new GulpSSH({
  ignoreErrors: false,
  sshConfig: sshConfig
});

// tolight : fixed gulp-ssh 多个文件 error 问题, 目前采用上传 .tar 的形式
gulp.task('deploy', ['deploy:copy'], function () {
  return gulpSSH
    .shell([
      // 备份 SandTable -> backup/SandTable_20160909.tar
      'cd /www/sandtable.alibaba-inc.com/',
      'tar -cf build_old.tar FE-SandTableMix/build/',
      'rm -rf backup/build_old.tar',
      'mv build_old.tar backup/',
      // 替换 frontEnd/dist,
      'rm -rf /www/sandtable.alibaba-inc.com/FE-SandTableMix/build/',
      'cp -rf backup/build_new.tar /www/sandtable.alibaba-inc.com/FE-SandTableMix/',
      'cd /www/sandtable.alibaba-inc.com/FE-SandTableMix/',
      'tar -xf build_new.tar',
      'rm -rf build_new.tar'
    ])
    .pipe(gulp.dest('logs'));
});

gulp.task('deploy:copy', ['deploy:clean'], function () {
  return gulp
  // tolight : 此处拷贝文件夹方法
    .src(['./build_new.tar'])
    .pipe(gulpSSH.dest('/www/sandtable.alibaba-inc.com/backup'));
});

gulp.task('deploy:clean', ['deploy:tar'], function () {
  return gulpSSH
    .shell(['cd /www/sandtable.alibaba-inc.com/backup', 'rm -rf build_new.tar'])
    .pipe(gulp.dest('logs'));
});

gulp.task('deploy:tar', function (cb) {
  exec('tar -cf build_new.tar build/', function (err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    cb(err);
  });
});
