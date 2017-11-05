var path = require('path');

module.exports = {
  entry: {
    'inline': './src/assets/js/inline.js'
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'static/js/[name].js'
  }
}
