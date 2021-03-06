/**
 * Created by bian17888 on 15/12/13.
 */
var _ = require('underscore');
var config_product = require('./config.product');
var env = process.env.NODE_ENV;
var mock = process.env.MOCK || false;

// 默认为开发环境 config
var config = {
	'env'  : 'development',
	'mock' : mock,
	'server' : {
		domain : '10.189.196.43',
		port : '8080'
	},
	'debug': true
}

// 生产环境 config
if (env === 'product') {
	config = _.extend(config, config_product);
}

module.exports = config