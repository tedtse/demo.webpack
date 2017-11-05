var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    'media': './src/assets/js/media.js'
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'static/js/[name].js'
  },
  module: {
    rules: [
      {
        test: /\.(mp4|ogg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'static/media/[hash].[ext]'
            }
          }
        ]
      },
      {
        test: /\.html$/,
        use: [
          {
            // loader: 'html-loader?attrs[]=img:src&attrs[]=source:src&attrs[]=audio:src',
            loader: 'html-loader',
            options: {
              attrs: [ 'img:src', 'source:src', 'audio:src' ]
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'media.html',
      template: './src/templates/media.html',
      inject: true,              // js插入位置,
      chunks: ['media']
    })
  ]
}
