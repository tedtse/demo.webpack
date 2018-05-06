var opn = require('opn');
var path = require('path');
var express = require('express');
var webpack = require('webpack');
var webpackConfig = require('./webpack.conf.js');

var app = express();
var compiler = webpack(webpackConfig);

var devMiddleware = require('webpack-dev-middleware')(compiler);

var hotMiddleware = require('webpack-hot-middleware')(compiler);

compiler.plugin('compilation', function (compilation) {
  // compilation.plugin('html-webpack-plugin-before-html-processing', function (htmlPluginData, cb) {
  //   var html = htmlPluginData.html;
  //   htmlPluginData.html = (html + '<script>console.log("haha")</script>')
  //   cb();
  // });
  compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
    hotMiddleware.publish({ action: 'reload' })
    cb();
  })
})

app.use(devMiddleware);
app.use(hotMiddleware);

var uri = 'http://localhost:3001';

devMiddleware.waitUntilValid(function () {
  opn(uri);
});

var server = app.listen(3001);
