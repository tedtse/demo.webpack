var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');

var pages = {
    home: './src/ejs/ejs_home.ejs',
    info: './src/ejs/ejs_info.ejs',
    data: './src/ejs/ejs_data.ejs'
};

module.exports = {
    entry: {
        home: './src/assets/js/ejs_home.js',
        info: './src/assets/js/ejs_info.js',
        data: './src/assets/js/ejs_data.js'
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