var HtmlWebpackPlugin = require('html-webpack-plugin');
var glob = require('glob');
var path = require('path');

var pages = getEntry('./src/templates/*.html');

function getEntry(globPath) {
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
    path: path.resolve(__dirname, 'dist'),
    filename: 'static/js/[name].js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['es2015']
            }
          }
        ]
      }
    ]
  },
  plugins: []
}

for (var page in pages) {
  var conf = {
    filename: page + '.html',
    template: pages[page],
    inject: true,              // js≤Â»ÎŒª÷√,
    chunks: [page]
  };
  module.exports.plugins.push(new HtmlWebpackPlugin(conf));
}
