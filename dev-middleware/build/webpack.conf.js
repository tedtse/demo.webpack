var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    index: './src/assets/js/index.js'
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'static/js/[name].js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './src/templates/index.html',
      inject: true,              // js插入位置,
      chunks: ['index']
    })
  ]
}
