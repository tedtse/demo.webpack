var ExtractTextPlugin = require("extract-text-webpack-plugin");

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
                test: /\.css$/,
                loader: ExtractTextPlugin.extract('style', 'css')
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin('static/css/style.css')
    ]
}