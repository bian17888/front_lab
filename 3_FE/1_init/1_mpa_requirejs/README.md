## 说明文档

此工程主要用来搭建前端静态工程,   


#### 已解决
- swig + stylus + requirejs -> 静态资源快速开发方案
- gulp
	- 浏览器自动同步预览
	- jsdoc 文档
	- 语法检测 
	- css js images 压缩打包 
	- ajax假数据
- Mock server
	- swig页面渲染假数据 ( 目前通过 swig 中定义 set实现 )
		- `注意 : ` {% include %} 必须包在某 {% block %} 内
	- ajax 异步获取假数据

#### 未来
- 加入 html5.js + easing.js 等常用框架

#### 备注
- mock server
	- 目前支持/api/xx 路径的假数据, 这块可根据具体接口定义, 在进行相应的过滤条件修改( mockServer函数中的 isMock 逻辑)


#### 未完待续......

