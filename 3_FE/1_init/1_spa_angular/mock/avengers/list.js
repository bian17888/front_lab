/**
 * @fileOverview
 * @author bian17888 16/7/11 17:28
 */

/**
 * 文章相关
 * 接口定义, 参考 : http://10.189.196.43:8080/sandtable/swagger/index.html#/articles-api
 */

var request = {
  // 当前页码
  pageNumber: 1,
  // 每页条数
  pageSize: 10
};

// 假数据, 用于本地开发
exports.response = function() {
  var data = [
    {name: 'Robert Downey Jr.', character: 'Tony Stark / Iron Man'},
    {name: 'Chris Hemsworth', character: 'Thor'}
  ];
  return {
    code: 0,
    data: data
  };
};

//////////////////////////////////////////////////

function random() {
  return (Math.random() * 100).toFixed(2) * 1;
}