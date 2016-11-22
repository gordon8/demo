# 门户类网站首页

## 项目简介

一个门户类网站的首页，使用模块化布局的思路，按照设计稿完成商城首页的结构和样式，并使用jQuery实现搜索切换、图片轮播、选项卡切换等功能。[预览](https://gordon8.github.io/project/pmbaike)

![截图](img/screenshot.jpg)

## 制作过程

### HTML结构部分

整体结构主要有五部分，分别是：header、nav、main、flink和footer。

### CSS部分

1. 初始化样式--reset
2. 定义整体布局样式--layout
3. 定义各部分样式--header、nav、main、flink和footer

### javaScript部分

主要包含3个功能：

1. 导航栏悬停
   当document向下滚动到导航栏时，导航栏固定在页面顶部；
   当document向上滚动到导航栏时，导航栏回归文档流。

2. 内容懒加载
   当loading出现在视窗内时，自动加载更多内容

3. 返回顶部
   当document向下滚动100px时，返回顶部按钮出现；
   点击返回顶部按钮后，document自动滚动到顶部。

最后使用RequireJS对js文件进行封装并压缩合并。

详细实现过程可查看源代码。


