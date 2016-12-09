var path = require('path');
var glob = require('glob'); // 用来读取webpack入口目录文件
var HtmlWebpackPlugin = require('html-webpack-plugin');

function getEntry (globPath) {
    var entries = {}, basename;
    glob.sync(globPath).forEach(function (entry) {
        basename = path.basename(entry, path.extname(entry));
        entries[basename] = entry;
    })
    return entries;
}

module.exports = {
    entry: getEntry('./src/js/*.js'),
    output: {
        path: './dist',
        filename: 'static/js/[name].[chunkhash].js'
    },
    plugins: []
    // plugins: [
        // new HtmlWebpackPlugin({
            // ...
        // })
    // ]
}

// 多页面
var pages = getEntry('./src/templates/*.html');
for (var entry in pages) {
    var conf = {
        filename: entry + '.html',
        template: pages[entry], // 模板路径
        chunks: [entry, 'vendor', 'manifest'], // 每个html引用的js模块
        inject: true,              // js插入位置
        minify: {
            removeComments: true,
            collapseWhitespace: true,
            removeAttributeQuotes: true
            // more options:
            // https://github.com/kangax/html-minifier#options-quick-reference
          },
        // necessary to consistently work with multiple chunks via CommonsChunkPlugin
        chunksSortMode: 'dependency'
    };
    module.exports.plugins.push(new HtmlWebpackPlugin(conf));
}