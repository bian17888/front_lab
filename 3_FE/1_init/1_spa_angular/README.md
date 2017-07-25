# Beacon - angular解决方案

**说明**

1 该项目前端主要使用Angular框架,自主改造,使结构上更适合大型项目开发;

2 项目构建使用gulp,实现：
- 项目初始化
	- 浏览器自动刷新
	- css预编译
	- 代码压缩合并版本号
	- 自动引入bower资源
	- angular缓存等
- 本地mock数据
- js语法检测
- jsdoc文档
- deploy脚本

3 本地联调线上API接口 - 通过nginx实现接口转发

## 一 本地环境(mock假数据)

### 1 软件安装

- 安装 Node.js
- 安装 tnpm
- 安装 n
- 安装 gulp + bower

#### 安装 Node.js

	// Mac 系统
	// 安装 homebrew
	见 : https://brew.sh/index_zh-cn.html
	// 安装Node.js
	brew install node
	
	// Windows系统
	见 : https://nodejs.org/en/

#### 安装 tnpm

	// 全局安装
	npm install tnpm -g --registry=http://r.npm.alibaba-inc.com

参考 : [tnpm](http://gitlab.alibaba-inc.com/node/tnpm)

#### 安装 n

	// 安装 n
	tnpm install -g n
	
	// 安装并使用 Node.js LTS 版本
	n lts
	n 回车
	选择 LTS 版本

参考 : [n](https://github.com/tj/n)

#### 安装 gulp + bower

	// 全局安装
	tnpm install -g gulp bower


### 2 配置

#### 安装依赖 gulp + bower

	// 在项目目录下
	tnpm install
	bower install

#### js语法检测

复制”connect-frontend/fe-connect/assets/githook/pre-commit”

粘贴覆盖到”connect-frontend/.git/hooks”

### 3 启动

#### 用WebStorm启动gulp任务

![](https://img.alicdn.com/tfs/TB1QbzqRXXXXXa5apXXXXXXXXXX-1916-1057.png)

![](https://img.alicdn.com/tfs/TB1wznvRXXXXXbJapXXXXXXXXXX-822-431.png)

*如上图显示失效,见assets/readme/gulp_configuration_mock.png和assets/readme/gulp_run.png*

#### 或用命令行启动gulp任务

	PORT=3100 MOCK=true HTML5MODEL=true gulp serve-dev

### 4 项目说明

mock文件夹为本地假数据;

api.js为总入文件, 用来配置 “请求url” 与 “假数据文件路径”.

![](https://img.alicdn.com/tfs/TB1fyvORXXXXXaMXFXXXXXXXXXX-1916-1057.png)

*如上图显示失效, 见assets/readme/local_mock_method.png*


## 二 本地环境(联调真实数据)

### 1 软件安装

#### 安装 nginx (1.10.1)

	// mac 安装
	brew install nginx
	
	// 其他系统
	http://nginx.org/en/download.html

### 2 配置

#### 配置 nginx

    server {
    
			listen 80;
			server_name dev.connect.net;
			location / {
				try_files $uri $uri/ /index.html;	# angular html5Model 模式
				proxy_buffering off;
				proxy_pass http://127.0.0.1:3100;
			}
			location ~ .*\.(json|gif|jpg|png|htm|html|css|js|flv|ico|swf|eot|svg|ttf|woff|pdf)(.*) {
				proxy_buffering off;
				proxy_pass http://127.0.0.1:3100;
			}
			location /user/ {
				proxy_buffering off;
				proxy_pass http://api.connect.aliyun.test/connect/user/9999/;
			}
			location /account/ {
				proxy_buffering off;
				proxy_pass http://connect.aliyun.test/connect-frontend/account/;
			}
	
		}

#### 配置 hosts

    ##### Connect
		127.0.0.1  dev.connect.net

#### 修改run.js

![让用户处于登录成功状态](https://img.alicdn.com/tfs/TB1GVjVRXXXXXcdXVXXXXXXXXXX-1268-814.png)

*如上图显示失效,见assets/readme/gulp_dev.png*

### 3 启动

#### 用WebStorm启动gulp任务

![](https://img.alicdn.com/tfs/TB1IJT3RXXXXXbtXpXXXXXXXXXX-1916-1057.png)

![](https://img.alicdn.com/tfs/TB1wznvRXXXXXbJapXXXXXXXXXX-822-431.png)

*如上图显示失效,见assets/readme/gulp_configuration.png和assets/readme/gulp_run.png*

#### 或用命令行启动gulp任务

	PORT=3100 MOCK=false gulp serve-dev

#### 启动nginx

	// mac 版本
	nginx
	nginx -s stop
	nginx -s reload
	
	// 命令文档见
	http://nginx.org/en/docs/switches.html


## 三 测试 预发 线上发布

- Aone操作
- 发布cdn

### 1 Aone操作

稍后附上wiki链接

### 2 发布cdn

	// 1. 执行gulp中的cdn
	gulp cdn
	
	// 2. git 提交
	git add .
	git commit -am "cdn"
	
	// 3. 发布到日常环境
	git push origin release-2.2.0:daily/2.2.0
	
	// 3. 验证
	http://assets.alibaba-inc.com/
	
	// 3. 访问地址
	https://g.assets.daily.taobao.net/AliyunCompetitor/connect-frontend/2.2.0/rev-manifest.json
	
	// 4. 更新cdn线上链接
	替换 web/WEB-INF/connect/index.html 中 css + js 链接地址
	
	// 5. git 提交
	git add .
	git commit -am "deploy"
	git push
	
	// 6. Aone部署验证
	
	==================== 分割线 ====================
	
	// 发布到线上环境
	git tag publish/x.y.z
	git push origin publish/x.y.z
	
	// 验证
	http://assets.alibaba-inc.com/
	
	// 访问地址
	https://g.alicdn.com/AliyunCompetitor/connect-frontend/2.2.0/rev-manifest.json

## 四 架构说明

- 目录说明
- 配置说明
	- bootstrap自定义样式
	- A+埋点配置
	- 聆听配置项
	- 官网登录配置项
	- debug 模式

### 1 目录说明

![](https://img.alicdn.com/tfs/TB1_knKRXXXXXXuaXXXXXXXXXXX-399-777.png)

*如上图显示失效, 见assets/readme/structure.png*

### 2 配置说明

#### 2.1 bootstrap自定义样式

解压 assets/bootstrap/bootstrap.zip

将生成的css、js、fonts文件夹copy到 src/client/bower_components/bootstrap/dist下

#### 2.2 A+埋点配置

见 utils.js - aplus部分

[埋点方法](http://log.alibaba-inc.com/log/info.htm?type=2395&id=19)

#### 2.3	 聆听配置项

见 utils.js - configLingting部分

#### 2.4 官网登录配置项

见 utils.js - configAliyun部分

#### 2.5 debug 模式

开关 - config.js -> debug: true
会控制 logger.js -> logger.info()的显隐

## 五 todo

- 单元测试
- 持续集成
- 优化
    - 初始化 hideSplash 遮罩层
