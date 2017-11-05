es6语法的翻译也是一个loader(babel-loader)

> 安装
```
  npm install babel-loader babel-core babel-preset-es2015 webpack --save-dev
```

> 配置文件
```
  rules: [
    {
      test: /\.js$/,
      exclude: /(node_modules|bower_components)/,
      use: [
        {
          loader: 'babel-loader',
          options: {
            presets: ['es2015']
          }
        }
      ]
    }
  ]
```
