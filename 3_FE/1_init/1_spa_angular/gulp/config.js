/**
 * @fileOverview
 * @author bian17888 16/4/25 07:57
 */

module.exports = function() {

  var client = './src/client/',
    clientApp = client + 'app/',
    tmp = client + '_tmp/',
    build = './build/';

  var config = {
    client: client,
    tmp: tmp,
    build: build,

    /**
     * node env
     */
    env: {
      port: process.env.PORT || 3100,
      mock: process.env.MOCK || 'false',
      node_env: process.env.NODE_ENV || 'development'
    },

    /**
     * file path
     */
    index: client + 'index.html',
    htmltemplates: clientApp + '**/*.html',
    html: clientApp + '**/*.html',
    alljs: ['./src/**/*.js', './*.js'],
    stylus: client + 'styles/**/*.styl',
    css: tmp + 'styles/**/*.css',
    js: [
      clientApp + '**/*.module.js',
      clientApp + '**/*.js',
      tmp + '*.js',
      '!' + clientApp + '**/*.spec.js'
    ],
    images: client + 'images/**/*.*',
    fonts: client + 'fonts/**/*.*',

    /**
     * templateCache
     */
    templateCache: {
      file: 'templates.js',
      options: {
        root: 'app/',
        module: 'app.core',
        standAlone: false

      }
    },
    /**
     * browser sync
     */
    browserReloadDelay: 1000,

    /**
     * Bower and NPM locations
     */
    bower: {
      bowerJson: require('../bower.json')
    },
    packages: [
      './package.json',
      './bower.json'
    ]

  };

  config.getWiredepDefaultOptions = function() {
    var options = {
      directory: config.bower.directory,
      bowerJson: config.bower.bowerJson,
      ignorePath: config.bower.ignorePath
    };
    return options;
  };

  return config;

  //////////////////////////////////////////////////


};