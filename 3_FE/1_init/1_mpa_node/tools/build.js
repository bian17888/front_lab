({
  appDir: './../src/client/',
  baseUrl: 'app/',
  mainConfigFile: './../src/client/app/main.js',
  dir: './../build',

  //When the optimizer copies files from the source location to the
  //destination directory, it will skip directories and files that start
  //with a ".". If you want to copy .directories or certain .files, for
  //instance if you keep some packages in a .packages directory, or copy
  //over .htaccess files, you can set this to null. If you want to change
  //the exclusion rules, change it to a different regexp. If the regexp
  //matches, it means the directory will be excluded. This used to be
  //called dirExclusionRegExp before the 1.0.2 release.
  //As of 1.0.3, this value can also be a string that is converted to a
  //RegExp via new RegExp().
  fileExclusionRegExp: /.styl$|^images$/,

  //If set to true, any files that were combined into a build bundle will be
  //removed from the output folder.
  removeCombined: true,

  //Finds require() dependencies inside a require() or define call. By default
  //this value is false, because those resources should be considered dynamic/runtime
  //calls. However, for some optimization scenarios, it is desirable to
  //include them in the build.
  //Introduced in 1.0.3. Previous versions incorrectly found the nested calls
  //by default.
  findNestedDependencies: true,

  optimize: 'uglify2',
  optimizeCss: 'standard.keepComments',
  modules: [
    {
      name: 'main',
    }, {
      name: 'page/index',
      exclude: ['main']
    }, {
      name: 'page/article/list',
      exclude: ['main']
    },
    {
      name: 'page/article/detail',
      exclude: ['main']
    }
  ]
})