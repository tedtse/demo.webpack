var webpack = require('webpack');

module.exports = {
    entry: {
        page_a: './src/assets/js/page_a.js'
    },
    output: {
        path: './dist',
        publicPath: '/dist/',
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