var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    'file2': './src/assets/js/file2.js'
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
            loader: 'file-loader',
            options: {
              name: 'static/images/[hash].[ext]'
            }
          }
        ]
        // loader: 'file-loader?name=static/images/[hash].[ext]'
      },
      {
        test: /\.html$/,
        use: [
          { loader: 'html-loader' }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'file2.html',
      template: './src/templates/file2.html',
      inject: true,              // js插入位置,
      chunks: ['file2']
    })
  ]
}
