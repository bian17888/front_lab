/**
 * Created by bian17888 on 15/10/20.
 */
var render = require('../module/render');
var utils = require('../module/utils');
var parse = require('co-body');

module.exports = {
  detail: detail,
  detailComments: detailComments
}

//////////////////////////////////////////////////

// 文章详情
function *detail(id) {
  var requestOptions = [
    {
      url: '/article/' + id
    }, {
      url: '/articles/top',
      qs: {
        limit: 5
      }
    }
  ];
  var data = yield utils.fetchMultiData(requestOptions, this);

  this.status = 200;
  this.body = yield render('article/detail', {data: data});
}

// 添加评论 || 点赞 || 收藏
function *detailComments(id) {
  var formData = yield parse(this);

  var requestOptions = {
    form: formData,
    method: this.req.method,
    url: this.url
  };
  var data = yield utils.fetchData(requestOptions, this);

  this.status = 200;
  this.body = data;
}