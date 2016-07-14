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
}

// 假数据, 用于本地开发
exports.response = function() {
  var data = [
    {
      "id": 18,
      "author": {
        "id": 1,
        "lastName": "夏海宏",
        "empId": "35969",
        "nickNameCn": "三昆"
      },
      "title": "xxx",
      "summary": "xxx",
      "content": null,
      "category": "xhh",
      "status": 1,
      "tags": "xxx",
      "is_favorite": null,
      "is_thumbed": null,
      "num_thumbed": null,
      "num_favorite": null,
      "attachments": [],
      "comments": [],
      "cover": "http://jingpin-sandtable-test.oss-cn-hangzhou-zmf.aliyuncs.com/cover/18?Expires=1468550365&OSSAccessKeyId=SvrgYVyelZaDQ8tD&Signature=Vs%2Bzk3vhdmYCNc7HqvHmu%2BzU0Ms%3D"
    },
    {
      "id": 20,
      "author": {
        "id": 1,
        "lastName": "夏海宏",
        "empId": "35969",
        "nickNameCn": "三昆"
      },
      "title": "test",
      "summary": "xxx",
      "content": null,
      "category": "xhh",
      "status": 2,
      "tags": "xxx",
      "is_favorite": null,
      "is_thumbed": null,
      "num_thumbed": null,
      "num_favorite": null,
      "attachments": [],
      "comments": [],
      "cover": "http://jingpin-sandtable-test.oss-cn-hangzhou-zmf.aliyuncs.com/cover/20?Expires=1468550365&OSSAccessKeyId=SvrgYVyelZaDQ8tD&Signature=0dxl51%2Bwa83IwydChNDpcHvOmMA%3D"
    },
    {
      "id": 28,
      "author": {
        "id": 1,
        "lastName": "夏海宏",
        "empId": "35969",
        "nickNameCn": "三昆"
      },
      "title": "test",
      "summary": "xxx",
      "content": null,
      "category": "xhh",
      "status": 2,
      "tags": "xxx",
      "is_favorite": null,
      "is_thumbed": null,
      "num_thumbed": null,
      "num_favorite": null,
      "attachments": [],
      "comments": [],
      "cover": "http://jingpin-sandtable-test.oss-cn-hangzhou-zmf.aliyuncs.com/cover/28?Expires=1468550365&OSSAccessKeyId=SvrgYVyelZaDQ8tD&Signature=V85X0jUVfm7uqCxTI2Ijf3VxsJw%3D"
    }
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