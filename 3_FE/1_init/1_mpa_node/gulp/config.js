/**
 * @fileOverview
 * @author bian17888 16/4/25 07:57
 */

module.exports = function() {

  var root = './',
    client = './src/client/',
    clientApp = client + 'app/',
    server = './src/server/',
    build = './build/';

  var config = {
    root: root,
    client: client,
    server: server,
    build: build,

    /**
     * file path
     */
    html: client + 'templates/**/*.html',
    js: [
      clientApp + '**/*.js',
      '!' + clientApp + 'components/**/*.js'
    ],
    stylus: client + 'css/**/*.styl',
    allcss: client + 'css/**/*.css',
    alljs: clientApp + '**/*.js',
    images: client + 'images/**/*.*',
    fonts: client + 'fonts/**/*.*',
    code: [
      build + 'app/',
      build + 'css/',
      build + 'templates/'
    ],
    /**
     * browser sync
     */
    browserReloadDelay: 1000,
    browserPort: 3200,

    /**
     * NPM locations
     */
    packages: [
      './package.json',
      './bower.json'
    ],

    /**
     * Node settings
     */
    defaultPort: 10000,
    nodeServer: server + 'app.js',
    deploy: {
      root: '/www/sandtable.alibaba-inc.com/',
      project: '/www/sandtable.alibaba-inc.com/FE-SandTableMix/',
      build: '/www/sandtable.alibaba-inc.com/FE-SandTableMix/build/'
    }

  };

  return config;

  //////////////////////////////////////////////////


};