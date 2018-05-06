var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        'art-template-home': './src/assets/js/art-template-home.js'
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
        ],
        // noParse: [/art-template/]
    },
    plugins: [
        new ExtractTextPlugin('static/css/style.css'),
        new HtmlWebpackPlugin({
            filename: 'art-template-home.html',
            template: './src/art-template/art-template-home.html',
            inject: true,
            chunks: ['art-template-home']
        })
    ],
    resolve: {
        alias: {
            'art-template': './lib/template.js'
        }
    }
};
