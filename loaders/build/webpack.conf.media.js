var HtmlWebpackPlugin = require('html-webpack-plugin'); 

module.exports = {
    entry: {
        'media': './src/assets/js/media.js'
    },
    output: {
        path: './dist',
        filename: 'static/js/[name].js'
    },
    module: {
        loaders: [
            {
                test: /\.(mp4|ogg)$/,
                loader: 'file-loader',
                query: {
                    name: 'static/media/[hash].[ext]'
                }
            },
            {
                test: /\.html$/,
                // loader: 'html?attrs[]=img:src&attrs[]=source:src&attrs[]=audio:src',
                loader: 'html',
                query: {
                    attrs: ['img:src', 'source:src', 'audio:src']
                }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'media.html',
            template: './src/templates/media.html',
            inject: true,              // js插入位置,
            chunks: ['media']
        })
    ]
}