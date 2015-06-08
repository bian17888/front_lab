/**
 * Created by biankai on 15/6/4.
 */

/**
 * Gulp.js 的配置文件文档
 * @module Gulp.config.js
 */
/**
 * gulp 自动化工具
 * @namespace GULP
 * @class Gconfig
 */


'use strict';
module.exports = function () {

	var clientStatic = './src/static/',
		clientView = './src/view/',
		tmp = './tmp/',
		server = tmp + 'server/';

	var config = {
		// index.html
		html : clientView + 'index.html',
		// all stylus
		allstylus : [ clientStatic + 'css/**/*.styl'],
		// all js to vet
		alljs : [clientStatic + 'js/**/*.js'],
		// page css
		pagecss : clientStatic + 'css/page/**/*.css',
		// page js
		pagejs : clientStatic + 'js/page/**/*.js',
		// output folder
		tmp : tmp,

		// bower config
		bower : {
			json : require('./bower.json'),
			directory : './bower_components',
			ignorePath : '../..'
		},

		// node config
		defaultPort : 7203,
		server : server,
		nodeServer : server + 'app.js'

	};

	config.getWiredepDefaultOptions = function () {
		var options = {
			bowerJson : config.bower.json,
			directory : config.bower.directory,
			ignorePath : config.bower.ignorePath
		};
		return options;
	};

	return config;
}