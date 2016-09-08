/**
 * Created by bian17888 on 15/10/20.
 */
var views = require('co-views');

var env = process.env.NODE_ENV;

var path = __dirname + './../../client/templates';
var cache = false;

// swig模板
if (env === 'product') {
  path = __dirname + './../../../build/templates';
  //todo : 正式上线后, 把cache改为true
  cache = false;
}

// setup views mapping .html
// to the swig template engine
module.exports = views(path, {
  map: {html: 'swig'},
  cache: cache
});