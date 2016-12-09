var path = require('path');
var glob = require('glob'); // ������ȡwebpack���Ŀ¼�ļ�
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

// ��ҳ��
var pages = getEntry('./src/templates/*.html');
for (var entry in pages) {
    var conf = {
        filename: entry + '.html',
        template: pages[entry], // ģ��·��
        chunks: [entry, 'vendor', 'manifest'], // ÿ��html���õ�jsģ��
        inject: true,              // js����λ��
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