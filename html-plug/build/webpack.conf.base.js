var HtmlWebpackPlugin = require('html-webpack-plugin'); 

module.exports = {
    entry: {
        'page-a': './src/assets/js/page-a.js',
        'page-b': './src/assets/js/page-b.js'
    },
    output: {
        path: './dist',
        filename: 'static/js/[name].js'
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'page-a.html',
            template: './src/templates/page-a.html',
            inject: 'head',              // js插入位置,
            chunks: ['page-a']
        }),
        new HtmlWebpackPlugin({
            filename: 'page-b.html',
            template: './src/templates/page-b.html',
            chunks: ['page-b']
        })
    ]
}