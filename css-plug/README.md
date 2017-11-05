webpack 要引入样式，分为内联引用和外部文件引用

### 内联引用
直接require('...css')

> 安装
```
  npm install css-loader --save-dev
```

> JS代码
```
  require('style-loader!css-loader!../css/style.css');
```
样式文件、loader(加载器)从右到左，以 "!" 为分隔符
可以运行 ***npm run inline*** 查看Demo

### 外部文件引用

> 安装
```
  npm install css-loader --save-dev
```
> 配置文件
```
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          use: ['css-loader']
        })
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('static/css/style.css')
  ]
```
可以运行 ***npm run text*** 查看Demo

### 引用 Sass 等预编译语言

> 安装
```
  npm install webpack autoprefixer-loader css-loader sass-loader node-sass --save-dev
```
如果 node-sass 安装不了可以输入命令 npm config set sass_binary_site=https://npm.taobao.org/mirrors/node-sass/ 或者在 ~/.npmrc 文件添加 sass_binary_site=https://npm.taobao.org/mirrors/node-sass/

> 配置文件
```
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
          { loader: 'autoprefixer-loader' },
          { loader: 'sass-loader' },
        ]
      }
    ]
  }
```
可以运行 ***npm run scss*** 查看Demo
