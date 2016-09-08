var url = require('url');
var koa = require('koa');
var _ = require('koa-route');
var session = require('koa-session');
var onerror = require('koa-onerror');
var logger = require('koa-logger');
var serve = require('koa-static');
var co = require('co');
var app = module.exports = koa();

var utils = require('./module/utils');
var render = require('./module/render');
var permission_ali = require('./module/permission_ali');
var routes = require('./route/init');
var config = require('./conf/config');
var env = process.env.NODE_ENV;
var port = process.env.PORT || 10000;


/**
 * App configuration
 */
app.keys = ['SandTableMix'];
// 静态文件目录
if (env === 'product') {
  app.use(serve(__dirname + './../../build'));
} else {
  app.use(serve(__dirname + './../client'));
}
// 异常处理中间件 : development生效
onerror(app);
app.use(logger());
app.use(session(app));


/**
 * 鉴权部分 : 根据url, 判断用户权限
 */
// buc
var buc = require('koa-buc');
var appname = 'jingpin-all';
app.use(buc({
  appname: appname,
  clientType: 'rest',
  ignore: '/api'
}));
app.use(permission_ali);


/**
 * Routes
 */
routes.bind(app);

/**
 * Start app up
 */
if(!module.parent){ app.listen(port); }
console.log('app is running on port ' + port);