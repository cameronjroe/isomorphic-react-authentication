'use strict';

var webpack = require('webpack'),
  // HtmlWebpackPlugin = require('html-webpack-plugin'),
  path = require('path'),
  srcPath = path.join(__dirname, 'app');

module.exports = {
  cache: true,
  entry: {
    module: [
      'webpack-dev-server/client?http://0.0.0.0:3001',
      path.join(srcPath, 'index.js')
    ],
    common: ['react', 'react-router', 'alt']
  },
  resolve: {
    root: srcPath,
    extensions: ['', '.js', '.jsx'],
    modulesDirectories: ['node_modules', 'app']
  },
  output: {
    path: path.join(__dirname, 'public/js'),
    publicPath: '',
    filename: '[name].js',
    library: ['Example', '[name]'],
    pathInfo: true
  },

  module: {
    loaders: [
      {test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel?cacheDirectory'}
    ]
  },

  plugins: [
    new webpack.optimize.CommonsChunkPlugin('common', 'common.js'),
    // new HtmlWebpackPlugin({
    //   inject: true,
    //   template: 'app/index.html'
    // }),
    new webpack.NoErrorsPlugin()
  ],

  debug: true,
  devtool: 'eval-cheap-module-source-map'
};