module.exports = {
    entry: {
        'scss': './src/assets/js/scss.js'
    },
    output: {
        path: './dist',
        filename: 'static/js/[name].js'
    },
    module: {
        loaders: [
            {
                test: /\.scss$/,
                // loaders: ['style-loader', 'css-loader', 'autoprefixer-loader', 'sass-loader']
                loader: 'style-loader!css-loader!autoprefixer-loader!sass-loader'
            }
        ]
    }
}