module.exports = {
    entry: {
        'inline': './src/assets/js/file.js'
    },
    output: {
        path: './dist',
        filename: 'static/js/[name].js'
    }
}