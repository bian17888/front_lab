/**
 * Created by bian17888 on 15/10/20.
 */
var app = require('../app');
var request = require('supertest').agent(app.listen());
var should = require('should');

var config = require('../conf/config');


describe('start', function() {
  it('permission with alibaba', function(done) {
    request
      .get('/acl/menus')
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err);
        done();
      })
  });
});