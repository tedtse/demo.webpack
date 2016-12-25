var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');
var webpack = require('webpack');

module.exports = {
    entry: {
        home: './src/assets/js/underscore_home.js'
    },
    output: {
        path: './dist',
        filename: 'static/js/[name].js'
    },
    module: {
        loaders: [
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract('style', 'css')
            },
            {
                test: /\.tpl$/,
                loader: 'string'
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin('static/css/style.css'),
        new webpack.ProvidePlugin({
            '_': 'underscore'
        }),
        new HtmlWebpackPlugin({
            filename: 'underscore_home.html',
            template: './src/underscore/underscore_home.html',
            inject: true,              // js插入位置,
            chunks: ['home']
        })
    ]
};