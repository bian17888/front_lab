/**
 * Created by bian17888 on 15/10/20.
 */
var app = require('./../app.js');
var request = require('supertest').agent(app.listen());

var co = require('co');

describe('The home page', function () {

	it('displays nicely without errors', function (done) {

		request
			.get('/')
			.expect(200)
			.expect('Content-Type', /html/)
			.end(done)
	});

})