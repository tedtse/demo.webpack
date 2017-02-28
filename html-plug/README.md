html-webpack-plugin这个插件用来帮助生成HTML文件，使用 script 标签来包含对应的 Webpack bundles

> 基本用法

#### 安装
```
  npm install webpack html-webpack-plugin --save-dev
```
#### 配置文件
```
plugins: [
    new HtmlWebpackPlugin({
        filename: 'page-a.html',      // 输出的HTML文件名称
        template: './src/templates/page-a.html',      // 输出的HTML文件模板
        inject: 'head',      // js插入位置,
        chunks: ['page-a']      // 引入的 Webpack bundles
    })
]
```
可以运行 ***npm run base*** 查看Demo

> glob模块

如果要生成多个HTML文件，可以用多个 new HtmlWebpackPlugin，如：
```
    new HtmlWebpackPlugin({
        ...
    }),
    new HtmlWebpackPlugin({
        ...    
    })
```
但显然不是一个好办法。这个时候可以用nodejs中的glob模块将要处理的所有文件生成一个key-value的json对象，用for...in函数来处理
#### 安装
``` 
  npm install webpack html-webpack-plugin glob --save-dev
```
#### 封装函数
```
  var HtmlWebpackPlugin = require('html-webpack-plugin'); 
  var glob = require('glob');
  var path = require('path');
  function getEntry (globPath) {
    var entries = {}, basename;
    glob.sync(globPath).forEach(function (entry) {
    basename = path.basename(entry, path.extname(entry))
      entries[basename] = entry
    })
    return entries;
  }
```
#### 配置文件
```
  for (var page in pages) {
    var conf = {
      filename: page + '.html',
      template: pages[page],
      inject: true,              // js插入位置,
      chunks: [page]
    };
    module.exports.plugins.push(new HtmlWebpackPlugin(conf));
  }
```
可以运行 ***npm run glob***查看Demo
