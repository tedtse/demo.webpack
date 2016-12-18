var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');
var glob = require('glob');
var path = require('path');

var pages = getEntry('./src/ejs/*.ejs');

function getEntry (globPath) {
    var entries = {}, basename;
    glob.sync(globPath).forEach(function (entry) {
    basename = path.basename(entry, path.extname(entry))
        entries[basename] = entry
    })
    return entries;
};

module.exports = {
    entry: getEntry('./src/assets/js/*.js'),
    output: {
        path: './dist',
        filename: 'static/js/[name].js'
    },
    module: {
        loaders: [
            {
                test: /\.ejs$/,
                loader: 'ejs-compiled-loader'
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract('style', 'css')
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin('static/css/style.css')
    ]
}

for (var page in pages) {
    var conf = {
        filename: page + '.html',
        template: pages[page],
        inject: true,              // js插入位置,
        chunks: [page]
    };
    module.exports.plugins.push(new HtmlWebpackPlugin(conf));
}