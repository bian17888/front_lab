# 概览

## 依赖

### 开发依赖

1. gulp

    gulp进行代码构建,主要完成以下几件事情

    1. `gulp-stylus`完成stylus编译成css
    2. `gulp-imerge`完成合图,css sprite
    3. `gulp-nocache`做静态资源md5化
    4. `gulp-uglify`, `gulp-minify-css`进行js和css压缩
    5. `gulp-document-write`做js文件合并

2. nobone

    使用`nobone`搭建开发环境

    1. 浏览器访问css时,直接将stylus编译成css
    2. 浏览器访问js时,如果访问的是前端模板jst,直接编译成js,并包装成amd的方式
    3. 代理vm模板到amazing进行解析

3. amazing

    完成`velocity`模板解析及数据模拟

### 代码依赖

1. jquery-ui

    使用`jquery-ui`,使前端UI组件化

2. require

    使用`require`进行模块化加载

3. underscore

    利用`underscore`提供的优秀工具集,简化前端数据操作

## 目录结构

1. 