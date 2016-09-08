/**
 * @fileOverview permission_ali
 * @desc
 * @author bian17888 16/8/23 13:48
 */

var app = require('../app');
var utils = require('./utils');

// acl
var ACL = require('@ali/node-acl');
var BUCClient = require('buc-client');
var BUCOptions = {
  ssoURL: 'https://login-test.alibaba-inc.com',
  apiKey: 'jingpin-all-@bW_hfvjn8__mumAFr',
  secretKey: '0$(l@_&Y$(h2v668Sb8rnfz&Ohp4_E4tEW&@f0&n',
  apiUrl: 'http://u-api.alibaba.net'
};
var client = ACL.createClient({
  protocol: 'http',
  bucClient: new BUCClient(BUCOptions)
});

module.exports = permissionAli;

//////////////////////////////////////////////////

function *permissionAli (next){
  var self = this;
  var path = self.path;
  var bucid = self.session.user.bucid;
  var permissionNames = [];

  permissionNames.push(utils.url2permission(path));

  try {
    var accessData = yield client.proxy.AccessControlService.checkPermissions({
      userId: bucid,
      permissionNames: permissionNames,
    });
  } catch (err) {
    console.error('acl error : ', err);
  }

  if (accessData.checkPermissionResults[0].accessible) {
    var cookie_bucid = self.cookies.get('jingpin-all_bucid');
    // 检查是否有写入 cookie
    if (!cookie_bucid) {
      var user = self.session.user;
      var ssoUser = self.session.user.ssoUser;

      var options = {
        bucid: user.bucid,
        lastName: encodeURI(user.lastName),
        empId: ssoUser.empId,
        nickNameCn: encodeURI(ssoUser.nickNameCn),
        avatar_url: user.avatar_url
      };

      for (var key in options) {
        var str = 'jingpin-all_' + key;
        self.cookies.set(str, options[key], {httpOnly: false});
      };
    };
  } else {
    utils.go2acl(self, permissionNames[0]);
    return;
  }
  yield next;
}