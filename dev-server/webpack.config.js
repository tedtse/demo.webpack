var webpack = require('webpack');
var path = require('path');

module.exports = {
    entry: {
        'page-a': './src/assets/js/page-a.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        // publicPath: '/dist/',
        filename: 'static/js/[name].js'
    },
    module: {
        loaders: [
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            }
        ]
    },
    devServer: {
        historyApiFallback: true,
        noInfo: true
    }
};
