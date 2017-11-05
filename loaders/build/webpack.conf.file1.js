var path = require('path');

module.exports = {
  entry: {
    'file1': './src/assets/js/file1.js'
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'static/js/[name].js'
  }
}
