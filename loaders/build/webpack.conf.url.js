var HtmlWebpackPlugin = require('html-webpack-plugin'); 

module.exports = {
    entry: {
        'url': './src/assets/js/url.js'
    },
    output: {
        path: './dist',
        filename: 'static/js/[name].js'
    },
    module: {
        loaders: [
            {
                test: /\.(png|jpg)$/,
                loader: 'url-loader',
                query: {
                    name: 'static/images/[hash].[ext]',
                    limit: 2048
                }
            },
            {
                test: /\.html$/,
                loader: 'html'
                // loader: 'html?attrs[]=img:src&attrs[]=img:data-src'
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'url.html',
            template: './src/templates/url.html',
            inject: true,              // js插入位置,
            chunks: ['url']
        })
    ]
}