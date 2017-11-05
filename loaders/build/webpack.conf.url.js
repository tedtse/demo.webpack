var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    'url': './src/assets/js/url.js'
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'static/js/[name].js'
  },
  module: {
    rules: [
      {
        test: /\.(png|jpg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              name: 'static/images/[hash].[ext]',
              limit: 2048
            }
          }
        ]
      },
      {
        test: /\.html$/,
        use: [
          {
            // loader: 'html-loader?attrs[]=img:src&attrs[]=img:data-src'
            loader: 'html-loader',
            options: {
              attrs: [ 'img:src', 'img:data-src' ]
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'url.html',
      template: './src/templates/url.html',
      inject: true,              // js插入位置,
      chunks: ['url']
    })
  ]
}
