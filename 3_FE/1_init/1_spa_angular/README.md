# Beacon - angular解决方案

**说明**

阿萨德阿斯达啊啊

## 一 本地环境

### 1 环境搭建

- 安装 tnpm
- 安装 n
- 安装 Node.js
- 安装 gulp + bower
- 安装 nginx

#### 安装 tnpm

	// 全局安装
	npm install tnpm -g --registry=http://r.npm.alibaba-inc.com

参考 : [tnpm](http://gitlab.alibaba-inc.com/node/tnpm)

#### 安装 n

	// 安装 n
	tnpm install -g n

参考 : [n](https://github.com/tj/n)

#### 安装 Node.js

	// 安装 LTS 版本
	n lts
	
	// 使用 LTS 版本
	n 回车
	选择 LTS 版本

#### 安装 gulp + bower

	// 全局安装
	tnpm install -g gulp bower

#### 安装 nginx

	// mac 安装
	brew install nginx
	
	// 其他系统
	http://nginx.org/en/download.html

### 2 配置

- 安装依赖 gulp + bower
- 配置 nginx

#### 安装依赖 gulp + bower

	// 在项目目录下
	tnpm install
	bower install

#### 配置 nginx

	server {
    	listen 80;
    	server_name sandtable.alibaba.net;
    
    	location / {
    		proxy_set_header Host "sandtable.alibaba.net";
    		proxy_buffering off;
    		proxy_pass http://127.0.0.1:9528;
    
    	}
    	location ~ .*\.(json|gif|jpg|png|htm|html|css|js|flv|ico|swf|eot|svg|ttf|woff|pdf)(.*) {
    		proxy_buffering off;
    		proxy_pass http://127.0.0.1:3001;
    	}
    	location ~ /(load|save)/ {
    		proxy_buffering off;
    		proxy_pass http://cloudaccount.alibaba-inc.com:12312;
    	}
    	location ~ /ctestapi/ {
    		proxy_buffering off;
    		proxy_pass http://10.97.248.53:9090;
    	}
    
    }

### 3 启动

- 本地 mock 假数据
- 调线上 API 接口

#### 本地 mock 假数据

	PORT=3100 MOCK=true gulp serve-dev

#### 调线上 API 接口

	PORT=3100 MOCK=false gulp serve-dev

## 二 测试环境 


## 三 线上环境

## 四 架构说明

- debug 模式

开关 - config.js -> debug: true
会控制 logger.js -> logger.info()的显隐

## 五 todo

- 单元测试
- 持续集成
- 优化
    - 初始化 hideSplash 遮罩层
- 增加 gulp 对 html5Model 支持,稍后整理 (HTML5MODEL)
