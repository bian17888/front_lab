var koa = require('koa');
var _ = require('koa-route');
var app = module.exports = koa();
var serve = require('koa-static');

// App configuration
app.use(serve(__dirname + '/public'));

// Routes
var homeRoutes = require('./routes/homeRoutes.js');
app.use(_.get('/',homeRoutes.showHome));
app.use(_.post('/',homeRoutes.submitHome));
app.use(_.get('/task/:id',homeRoutes.showTask));

// Start app up
app.listen(3000);
console.log('app is running on port 3000');