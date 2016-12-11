var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin'); 

module.exports = {
    entry: {
        'extract-text-webpack-plugin': './src/assets/js/extract-text-webpack-plugin.js'
    },
    output: {
        path: './dist',
        filename: 'static/js/[name].js'
    },
    module: {
        loaders: [
            {
                test: '/\.css$/',
                // loader: ExtractTextPlugin.extract('style', 'css')
                loader: ExtractTextPlugin.extract('loader', 'css')
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin('static/css/style.css'),
        new HtmlWebpackPlugin({
            filename: 'extract-text-webpack-plugin.html',
            template: './src/templates/extract-text-webpack-plugin.html',
            chunks: ['extract-text-webpack-plugin']
        })
    ]
}