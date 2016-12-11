var HtmlWebpackPlugin = require('html-webpack-plugin'); 
var glob = require('glob');
var path = require('path');

var pages = getEntry('./src/templates/*.html');

function getEntry (globPath) {
    var entries = {}, basename;
    glob.sync(globPath).forEach(function (entry) {
    basename = path.basename(entry, path.extname(entry))
        entries[basename] = entry
    })
    return entries;
};

module.exports = {
    entry: getEntry('./src/assets/js/*.js'),
    output: {
        path: './dist',
        filename: 'static/js/[name].js'
    },
    plugins: []
}

for (var page in pages) {
    var conf = {
        filename: page + '.html',
        template: pages[page],
        inject: true,              // js插入位置,
        chunks: [page]
    };
    module.exports.plugins.push(new HtmlWebpackPlugin(conf));
}
