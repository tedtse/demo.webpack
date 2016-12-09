var HtmlWebpackPlugin = require('html-webpack-plugin'); 

module.exports = {
    entry: { index: './src/assets/js/index.js' },
    output: {
        path: './dist/',
        filename: './static/[name].js'
    },
    module: {
        loaders: [
            {
                test: /\.ejs|\.html$/,
                loader: 'ejs-compiled'
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/templates/index.ejs'
        })
    ]
}