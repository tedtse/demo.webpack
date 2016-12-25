var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        home: './src/assets/js/artTemplate_home.js'
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
            filename: 'artTemplate_home.html',
            template: './src/artTemplate/artTemplate_home.html',
            inject: true,              // js≤Â»ÎŒª÷√,
            chunks: ['home']
        })
    ],
    resolve: {
        alias: {
            'art-template': './lib/template.js'
        }
    }
};