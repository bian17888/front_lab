/**
 * Created by bian17888 on 15/12/6.
 */

module.exports = function(){
	var root = './'
	var client = './src/client/';
	var clientApp = client + 'app/';
	var server = './src/server/';
	var temp = './.tmp/';
	var build = './build/';

	var config = {
		root : root,
		temp: temp,
		client: client,
		server : server,
		build : build,

		/**
		 * Files paths
		 */
		index : client + 'index.html',
		htmltemplates : clientApp + '**/*.html',
		html : clientApp + '**/*.html',
		css : temp + 'styles.css',
		js : [
			clientApp + '**/*.module.js',
			clientApp + '**/*.js',
			'!' + clientApp + '**/*.spec.js'
		],
		alljs : ['./**/*.js', './*.js'],
		less: client + 'styles/styles.less',
		fonts : './bower_components/font-awesome/fonts/**/*.*',
		images : client + 'images/**/*.*',

		/**
		 * template cache
		 */
		templateCache : {
			file : 'template.js',
			options : {
				module : 'app.core',
				standAlone : false,
				root : 'app/'
			},
		},

		/**
		 * browser sync
		 */
		browserSyncReloadDelay : 1000,

		/**
		 * Bower and NPM locations
		 */
		bower: {
			json: require('./bower.json'),
			directory: './bower_components/',
			ignorePath: '../..'
		},
		packages : [
			'./package.json',
			'./bower.json'
		],

		/**
		 * Node settings
		 */
		defaultPort : 7203,
		nodeServer : server + 'app.js'



	}

	/**
	 * getWiredepDefaultOptions : 获取 wiredep 默认设置
	 * @returns {{bowerJson: *, directory: string, ignorePath: string}}
	 */
	config.getWiredepDefaultOptions = function(){
		var options = {
			bowerJson: config.bower.json,
			directory: config.bower.directory,
			ignorePath: config.bower.ignorePath
		};
		return options;
	}

	return config;

}