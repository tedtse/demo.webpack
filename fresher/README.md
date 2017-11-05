对于初学者来说，webpack可能只是个js的打包工具，js压缩，css压缩，js、css文件的时间戳全部用grunt、gulp、fis等工具完成。

> 安装
```
  npm install webpack -g
```

> 配置文件
```
  var path = require('path');
  ...
  entry: {
    'page-a': './src/assets/js/page-a.js',
    'page-b': './src/assets/js/page-b.js'
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'static/js/[name].js'
  }
```
