module.exports = {
    entry: {
        'page_a': './src/assets/js/page_a.js',
        'page_b': './src/assets/js/page_b.js'
    },
    output: {
        path: './dist',
        filename: 'static/js/[name].js'
    }
}