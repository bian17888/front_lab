/**
 * Created by bian17888 on 15/10/20.
 */
var render = require('./../lib/render.js');
var parse = require('co-body');
var request = require('supertest');
var superagent = require('superagent');
var co = require('co');


/* 首页 */
module.exports.showHome = function *() {
	this.body = yield render('home');
}


/* 创建任务 */
module.exports.submitHome = function *() {

	var postedData = yield parse(this);
	var strParams = JSON.stringify(postedData.params);
	postedData.params = strParams;
	var resbody = yield _superagent(postedData);
	
	this.response.status = 200;
	this.response.body = resbody;

}


/* 查看任务 */
module.exports.showTask = function *(id) {

	var resbody = yield _superagent_get(id);
	var objParams = JSON.parse(resbody.data.params);
	resbody.data.params = objParams;

	this.response.status = 200;
	this.body = yield render('showtask',resbody);

}


/**
 * post 请求转发
 * @param postedData
 * @returns {Function}
 * @private
 */
function _superagent(postedData) {
	return function (callback) {
		superagent
			.post('http://mo.alibench.com/task/new.json')
			.type('form')
			.send(postedData)
			.end(function (err, res) {
				if (err && err.status === 404) {
					//console.log('404');
				}
				else if (err) {
					//console.log('error');
					// all other error types we handle generically
					callback(null, res.body)
				}
				else {
					callback(err, res.body)
				}
			})
	}
}


/**
 * get 请求转发
 * @param uid
 * @returns {Function}
 * @private
 */
function _superagent_get(uid) {
	return function (callback) {
		superagent
			.get('http://mo.alibench.com/task/' + uid + '/get.json')
			.end(function (err, res) {
				callback(err, res.body)
			})
	}
}