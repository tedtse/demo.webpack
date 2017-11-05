var path = require('path');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  entry: {
    'extract-text-webpack-plugin': './src/assets/js/extract-text-webpack-plugin.js'
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'static/js/[name].js'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          use: ['css-loader']
        })
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('static/css/style.css')
  ]
}
