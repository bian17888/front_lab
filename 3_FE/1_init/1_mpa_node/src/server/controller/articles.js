/**
 * Created by bian17888 on 15/10/20.
 */
var querystring = require('querystring');

var render = require('../module/render');
var utils = require('../module/utils');

module.exports = {
  daily : daily,
  dailyNewest : dailyNewest,
  category : category
}

//////////////////////////////////////////////////

// 列表页 : 当天竞争日报
function *dailyNewest() {
  var self = this;
  var date = utils.formatteDate(new Date());
  var url = '/articles/daily/' + date + '?pageNumber=1&pageSize=10';

  self.status = 302;
  self.redirect(url);

}

// todo : 列表页 : 竞争日报
function *daily() {
  var self = this;
  var date = self.path.split('/').pop();
  var requestOptions = [
    {
      url: self.path,
      qs : querystring.parse(self.querystring)
    }
  ];
  var data = yield utils.fetchMultiData(requestOptions, self);

  self.status = 200;
  this.body = yield render('article/list', {data : data});

}

// todo : 列表页 : 竞争日报
function *category() {
  var self = this;
  var requestOptions = [
    {
      url: self.path,
      qs : querystring.parse(self.querystring)
    }
  ];
  var data = yield utils.fetchMultiData(requestOptions, self);

  self.status = 200;
  this.body = yield render('article/category', {data : data});

}