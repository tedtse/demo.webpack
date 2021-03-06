var webpack = require('webpack');

module.exports = {
    entry: {
        page_a: './src/assets/js/page_a.js'
    },
    output: {
        path: './dist',
        filename: 'static/js/[name].js'
    },
    module: [
        {
            test: /\.css$/,
            loader: 'style-loader!css-loader'
        }
    ]
};