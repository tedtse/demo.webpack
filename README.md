本README.md为 Webpack简易Demo 的提纲

### 初学者用Webpack
初学者用webpack可能只是个js打包工具。点击这里[fresher](./fresher)

### Webpack引入HTML文件
Webpack以JS为入口文件，输出对应的bundle，如果想要关联HTML文件，可以用[html-webpack-plugin](./html-plug/)插件

### Webpack引入CSS文件
Webpack通过requrie('...css')在Js bundle 中引入CSS文件，导致CSS文本放入Js文件中。要想将CSS文件抽出来放至HTML中，可以用extract-text-webpack-plugin](./css-plug/)插件

### Webpack与模板
本Demo主要作了Webpack引入HTML构建模板(ejs)、Runtime时的数据模板(ejs、underscore、art-template)的简单示例[template](./template)

### Webpack之loader
如果对Webpack中的file-loader、url-loader、html-loader不了解的可以点击这里[loaders](./loaders)

### Webpack之es6
想用Webpack的项目中用es6语法，可以点击这里[es6](./es6)
