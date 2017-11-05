var path = require('path');

module.exports = {
  entry: {
    'page-a': './src/assets/js/page-a.js',
    'page-b': './src/assets/js/page-b.js'
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'static/js/[name].js'
  }
}
