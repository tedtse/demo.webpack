var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
// var HtmlWebpackIncludeAssetsPlugin = require('html-webpack-include-assets-plugin');

module.exports = {
  entry: {
    'page-a': './src/assets/js/page-a.js',
    'page-b': './src/assets/js/page-b.js'
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'static/js/[name].js'
  },
  plugins: [
    // new HtmlWebpackIncludeAssetsPlugin({
    //   assets: ['./static/config.js'],
    //   append: false
    // }),
    new HtmlWebpackPlugin({
      filename: 'page-a.html',
      template: './src/templates/page-a.html',
      inject: 'head',              // js插入位置,
      chunks: ['page-a']
    }),
    new HtmlWebpackPlugin({
      filename: 'page-b.html',
      template: './src/templates/page-b.html',
      chunks: ['page-b']
    })
  ]
}
