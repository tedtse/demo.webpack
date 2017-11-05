var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: {
    'scss': './src/assets/js/scss.js'
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'static/js/[name].js'
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          use: ['css-loader', 'autoprefixer-loader', 'sass-loader']
        })
        // use: [
        //   'style-loader',
        //   'css-loader',
        //   'autoprefixer-loader',
        //   'sass-loader'
        // ],
        // use: 'style-loader!css-loader!autoprefixer-loader!sass-loader'
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('static/style/page.css')
  ]
}
