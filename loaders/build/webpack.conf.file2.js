var HtmlWebpackPlugin = require('html-webpack-plugin'); 

module.exports = {
    entry: {
        'file2': './src/assets/js/file2.js'
    },
    output: {
        path: './dist',
        filename: 'static/js/[name].js'
    },
    module: {
        loaders: [
            {
                test: /\.(png|jpg)$/,
                loader: 'file-loader?name=static/images/[hash].[ext]'
            },
            {
                test: /\.html$/,
                loader: 'html'
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'file2.html',
            template: './src/templates/file2.html',
            inject: true,              // js插入位置,
            chunks: ['file2']
        })
    ]
}