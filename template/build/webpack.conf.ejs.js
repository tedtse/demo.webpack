var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');

var pages = {
    'ejs-home': './src/ejs/ejs-home.ejs',
    'ejs-info': './src/ejs/ejs-info.ejs',
    'ejs-data': './src/ejs/ejs-data.ejs'
};

module.exports = {
    entry: {
        'ejs-home': './src/assets/js/ejs-home.js',
        'ejs-info': './src/assets/js/ejs-info.js',
        'ejs-data': './src/assets/js/ejs-data.js'
    },
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
            },
            {
                test: /\.tpl$/,
                loader: 'string'
            }
        ],
        noParse: [/ejs.min.js/]
    },
    resolve: {
        alias: {
            'ejs': './lib/ejs.min.js'
        }
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