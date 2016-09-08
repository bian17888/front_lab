/**
 * @fileOverview
 * @author bian17888 16/7/19 00:15
 */

define(function(require) {

  var commentItem = '<div class="row">\n  <div class="row-height">\n    <div class="col-sm-1 col-sm-height col-sm-top"><img\n          class="pic-head img-responsive img-circle"\n          src="<%= img %>" alt="">\n    </div>\n    <div class="col-sm-11 col-sm-height col-sm-top">\n      <p class="author clearfix"><a\n            href="#"><%= nickNameCn %></a>\n        <span class="pull-right time"><%= time %></span>\n      </p>\n      <p class="info overflow-h">\n        <%= content %>\n      </p>\n    </div>\n  </div>\n</div>';

  var template = {
    commentItem: commentItem
  };

  return template;

  //////////////////////////////////////////////////

});