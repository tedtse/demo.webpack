var path = require('path');

module.exports = {
    entry: {
        'inline': './src/assets/js/inline.js'
    },
    output: {
        path: './dist',
        filename: 'static/js/[name].js'
    }
}