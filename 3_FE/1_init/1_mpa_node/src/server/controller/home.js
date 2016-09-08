/**
 * Created by bian17888 on 15/10/20.
 */
var render = require('../module/render');
var utils = require('../module/utils');
var config = require('../conf/config.js');


module.exports = {
  index: index,
  mCommon: mCommon
}

//////////////////////////////////////////////////

/**
 * 首页
 */
function *index() {
  var self = this;
  var requestOptions = [
    {
      url: '/articles/daily/lines'
    },
    {
      url: '/articles/recommend',
      qs : {
        pageNumber : 1,
        pageSize : 6
      }
    },
    {
      url: '/articles/daily/recommend',
      qs : {
        limit : 5
      }
    },
    {
      url: '/perfdata/day'
    }
  ]

  var data = yield utils.fetchMultiData(requestOptions, self);

  self.status = 200;
  self.body = yield render('index', {data: data});
}


/**
 * 公共模块提取
 * 不用于业务, 仅用于方便查看, 统一把控
 */

function *mCommon() {
  var self = this;
  self.status = 200;
  self.body = yield render('module/m-template')
}