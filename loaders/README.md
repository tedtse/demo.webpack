loaders 是 webpack 非常重要的一个配置项目，主要管理不同格式文件引用的规则，下面说一些主要的几个 loader

### JS 直接使用 loader

> 基本用法

#### 安装
```
  npm install webpack file-loader --save-dev
```

#### JS代码
```
  require('../images/name.jpg')
  require('file-loader?name=static/images/[hash].[ext]!../images/name.jpg')
```
图片文件 (.jpg, .gif, .png) 有 webpack 默认的加载器，可以直接 require。
但量如果需要给文件加上 hash， 则需要用 file-loader

### 配置文件处理图片文件

> 基本用法

#### 安装
```
  npm install webpack file-loader html-loader --save-dev
```

#### 配置文件
```
  rules: [
    {
      test: /\.(png|jpg)$/,
      use: [
        {
          loader: 'file-loader',
          options: {
            name: 'static/images/[hash].[ext]'
          }
        }
      ]
    },
    {
      test: /\.html$/,
      use: [
        { loader: 'html-loader' }
      ]
    }
  ]
```

### 媒体资源文件

> 基本用法

#### 安装
```
  npm install webpack file-loader html-loader --save-dev
```

#### 配置文件
```
  rules: [
    {
      test: /\.(mp4|ogg)$/,
      use: [
        {
          loader: 'file-loader',
          options: {
            name: 'static/media/[hash].[ext]'
          }
        }
      ]
    },
    {
      test: /\.html$/,
      use: [
        {
          // loader: 'html-loader?attrs[]=img:src&attrs[]=source:src&attrs[]=audio:src',
          loader: 'html-loader',
          options: {
            attrs: [ 'img:src', 'source:src', 'audio:src' ]
          }
        }
      ]
    }
  ]
```

### url-loader
url-loader 和 file-loader 非常类似，区别在于 url-loader 有 base64 选项

> 基本用法

#### 安装
```
  npm install webpack url-loader html-loader --save-dev
```

#### 配置文件
```
  rules: [
      {
        test: /\.(png|jpg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              name: 'static/images/[hash].[ext]',
              limit: 2048
            }
          }
        ]
      },
      {
        test: /\.html$/,
        use: [
          {
            // loader: 'html-loader?attrs[]=img:src&attrs[]=img:data-src'
            loader: 'html-loader',
            options: {
              attrs: [ 'img:src', 'img:data-src' ]
            }
          }
        ]
      }
    ]
```
