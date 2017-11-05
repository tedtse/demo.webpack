var path = require('path');

module.exports = {
  entry: {
    'scss': './src/assets/js/scss.js'
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'static/js/[name].js'
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
          { loader: 'autoprefixer-loader' },
          { loader: 'sass-loader' },
        ]
        // loaders: ['style-loader', 'css-loader', 'autoprefixer-loader', 'sass-loader']
        // loader: 'style-loader!css-loader!autoprefixer-loader!sass-loader'
      }
    ]
  }
}
