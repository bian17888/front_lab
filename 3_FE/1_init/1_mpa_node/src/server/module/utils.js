/**
 * Created by bian17888 on 15/11/16.
 */
var fs = require('fs');
var async = require('async');
var request = require('request');

var config = require('../conf/config');
var isMock = process.env.MOCK;


module.exports = {
  fetchData: fetchData,
  fetchMultiData: fetchMultiData,
  go2acl: go2acl,
  url2permission: url2permission,
  formatteDate: formatteDate
}

//////////////////////////////////////////////////

/**
 * @func fetchData
 * @desc 发送单条请求
 * @param {Object} options
 * @param {Object} ctx
 * @returns {Function}
 */
function fetchData(options, ctx) {
  var options = {
    baseUrl: 'http://' + config.server.domain + ':' + config.server.port,
    form: options.form || {},
    headers: ctx.headers,
    method: options.method || 'GET',
    jar: true,
    json: true,
    url: options.url || ''
  };
  var filePath = __dirname + '/../mock' + options.url + '.json'

  // isMock 为 true, 读取本地/mock/xx.json 文件
  if (isMock === 'true') {
    return function(callback) {
      fs.readFile(filePath, 'utf-8', function(err, result) {
        var result_to_json = JSON.parse(result);
        if (err) return callback(err);
        callback(null, result_to_json);
      })
    }
  } else {
    return function(callback) {
      request(options, function(err, response, body) {
        if (err) return callback(err);
        callback(null, body)
      });
    }
  }
}


/**
 * @func fetchMultiData
 * @desc 发送多条请求, 并合并返回结果
 * @param requestOptions - request框架的 options 选项
 * @returns {Function}
 */
function fetchMultiData(requestOptions, ctx) {
  // 拼接 [] : 因为每页面都需要获取 /acl/menus
  var defaultOptions = [{url: '/acl/menus', qs: {filter: true}}];
  var options = defaultOptions.concat(requestOptions);

  // isMock 为 true, 读取本地/mock/xx.json 文件
  if (isMock === 'true') {
    return function(callback) {
      async.map(options, fileGet, function(err, result) {
        if (err) return callback(err);
        callback(null, result)
        console.log('==========');
        console.log(result);
      })
    }
  } else {
    return function(callback) {
      async.map(options, httpGet, function(err, result) {
        if (err) return callback(err);
        callback(null, result)
        console.log('==========');
        console.log(result);
      })
    }
  }

  //////////////////////////////////////////////////
  /**
   * @func httpGet
   * @desc 参考 : http://stackoverflow.com/questions/34436455/calling-multiple-http-requests-in-a-single-http-request-in-node-js
   * @param url
   * @param callback
   */
  function httpGet(option, callback) {
    var url = option.url;
    var options = {
      baseUrl: 'http://' + config.server.domain + ':' + config.server.port,
      headers: ctx.headers,
      jar: true,
      json: true,
      method: option.method || 'GET',
      qs: option.qs || {},
      url: url,
    };

    request(options, function(error, response, body) {
      var data = body || {};
      var formatData = {};

      // 增加status字段, 用于swig判定返回数据正确性 : 200为正常
      data.status = response.statusCode || 0;

      // 详情页时, 手动赋予 key值
      if (url.search('/article/') !== -1) {
        formatData['article'] = data;
      }
      // 日报列表页 : 需要特殊判断下, 因为url为'/articles/daily/2016-08-08'
      else if (url.search('/articles/daily/') > -1 && url.search('-') > -1) {
        formatData['daily'] = data;
      }
      // 文章文类列表
      else if (url.search('/articles/category/') > -1) {
        formatData['category'] = data;
      }
      else {
        formatData[url] = data;
      }
      callback(error, formatData);

    })
  }

  /**
   * @func fileGet
   * @desc 参考 : http://stackoverflow.com/questions/9618142/asynchronously-reading-and-caching-multiple-files-in-nodejs
   * @param url
   * @param callback
   */
  function fileGet(option, callback) {
    var url = option.url;
    var filePath = __dirname + '/../mock' + url + '.json';

    fs.readFile(filePath, 'utf-8', function(err, data) {
      var formatData = {};
      var data_to_json = JSON.parse(data);

      // 增加status字段, 用于swig判定返回数据正确性 : 200为正常
      data_to_json.status = 200;

      // 详情页时, 手动赋予 key值
      if (url.search('/article/') !== -1) {
        formatData['article'] = data_to_json;
      } else if (url.search('/articles/daily/') > -1 && url.search('-') > -1) {
        formatData['daily'] = data_to_json;
      }
      else if (url.search('/articles/category/') > -1) {
        formatData['category'] = data_to_json;
      }
      else {
        formatData[url] = data_to_json;
      }
      callback(err, formatData);
    })
  }
}


/**
 * @func go2acl
 * @desc 跳转到申请权限页面
 * @param {object} ctx
 * @param {permissionName} permissionName - 需要申请权限名称
 */
function go2acl(ctx, permissionName) {
  var aclApplyURL = 'http://acl-test.alibaba-inc.com/apply/instance/post.htm?pnames=';
  ctx.type = 'html';
  ctx.body = [
    '<h1 style="margin-top:50px; text-align: center">╮(╯∀╰)╭ 你没有当前页面的访问权限</h1>',
    '<p style="font-size:20px; text-align: center"><a href="' + aclApplyURL + permissionName + '">申请权限</a></p>'
  ].join('');
}


/**
 * @func url2permission
 * @desc 将请求的 url 转换成 "acl鉴权的名称"
 * @param {string} path - 请求的 url
 */
function url2permission(path) {
  var defaultPermissionName = 'sandtable_index';
  var permissionName = '';
  var mapObj = {
    'sandtable_news_daily': '/articles/daily/'
    //'sandtable_test': '/',
  };

  // 权限名称 <-> 对应url
  // 模糊匹配 :
  //    path为"/articles/daily/xxx" -> 匹配成功 "/articles/daily/"
  // 逻辑 :
  //    成功 -> 返回该权限名
  //    失败 -> 返回默认权限 "sandtable_index" (首页访问权限)
  for (var prop in mapObj) {
    var result = path.indexOf(mapObj[prop]);
    if (result > -1) {
      permissionName = prop;
      return permissionName;
    } else {
      return defaultPermissionName;
    }
  }
}


/**
 * @func formatteDate
 * @desc  格式化日期
 * @param {Object} Date - new Date() 对象
 * @return {string} - 返回 xxxx-xx-xx 格式
 */
function formatteDate(Date) {
  var month = Date.getMonth() + 1;
  var y = Date.getFullYear();
  var m = (month < 10 ) ? '0' + month : month;
  var d = (Date.getDate() < 10 ) ? '0' + Date.getDate() : Date.getDate();

  return y + '-' + m + '-' + d;
}
