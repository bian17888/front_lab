/**
 * Created by bian17888 on 15/11/19.
 */

var _ = require('koa-route');

var routes = [
  // 首页
  {
    path: '/',
    method: 'get',
    controller: require('../controller/home').index
  },
  /*
   * 列表页
   * 包括 : 日报 || 文章分类
   * */
  {
    path: '/articles/daily/',
    method: 'get',
    controller: require('../controller/articles').dailyNewest
  }, {
    path: '/articles/daily/:date',
    method: 'get',
    controller: require('../controller/articles').daily
  }, {
    path: '/articles/category/:category',
    method: 'get',
    controller: require('../controller/articles').category
  }, {
    path: '/articles/top',
    method: 'get',
    controller: require('../controller/articles').category
  },
  /*
   * 文章详情页
   * 包括 :
   *    文章详情 || 热门文章
   *    添加评论 || 点赞,取消赞 || 收藏,取消收藏
   * */
  {
    path: '/article/:id',
    method: 'get',
    controller: require('../controller/article').detail
  }, {
    path: '/article/:id/comment',
    method: 'post',
    controller: require('../controller/article').detailComments
  }, {
    path: '/article/:id/thumb',
    method: 'post',
    controller: require('../controller/article').detailComments
  }, {
    path: '/article/:id/thumb',
    method: 'delete',
    controller: require('../controller/article').detailComments
  }, {
    path: '/article/:id/favorite',
    method: 'post',
    controller: require('../controller/article').detailComments
  }, {
    path: '/article/:id/favorite',
    method: 'delete',
    controller: require('../controller/article').detailComments
  },
  // 模板页面
  {
    path: '/m-modules',
    method: 'get',
    controller: require('../controller/home').mCommon
  }
];

exports.bind = function(app) {
  routes.forEach(function(value, key) {
    app.use(_[value.method](value.path, value.controller))
  })
}