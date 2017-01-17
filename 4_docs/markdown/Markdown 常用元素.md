# Markdown 常用元素

个人摘录,用于快速使用 markdown.

**目录**

- 常用部分
- 技巧部分

## 常用部分

#### h4标题
___

一段文字, 包含 **文本加粗** *斜体* `转换标签<a>` ~~删除线~~ [超链接](http://www.alyun.com,”title属性”) <button>button按钮</button>

下面是一副图片
![风景图片](https://c1.staticflickr.com/1/586/22946295261_43d0ae77dd_c.jpg,”Alt属性”)
风景图片说明文字

Ul 列表

- Item 01
	- inner 01
- Item 02

Li 列表

1. Item
1.1. inner
1.2. inner
1.2.1. sub
2. Item

3x3 表格
| 标题1 | 标题2 | 标题3 |
|:-|:-|:-|
| 内容1 | 内容2 | 内容3 |
| [链接4](http://www.taobao.com) | 内容5 | 内容6 |

> 引用文字实例
> > 引用文字

下面是代码片段

*[Language: Javascript]*

	console.log(‘hello world!’);

## 技巧部分

超链接缩写 : <http://www.alyun.com>

超链接引用 : [文章](1)

代码片段 : 

```
// 多行代码
function random() {
	var num = parseInt(Math.random() * 100);
	console.log(num)
}
```

[1]: http://www.aliyun.com