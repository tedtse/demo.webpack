var HtmlWebpackPlugin = require('html-webpack-plugin'); 

module.exports = {
    entry: {
        'page_a': './src/assets/js/page_a.js',
        'page_b': './src/assets/js/page_b.js'
    },
    output: {
        path: './dist',
        filename: 'static/js/[name].js'
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'page_a.html',
            template: './src/templates/page_a.html',
            inject: 'head',              // js插入位置,
            chunks: ['page_a']
        }),
        new HtmlWebpackPlugin({
            filename: 'page_b.html',
            template: './src/templates/page_b.html',
            chunks: ['page_b']
        })
    ]
}