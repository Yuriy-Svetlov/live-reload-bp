
const 
  path = require('path'),
  webpack = require('webpack'),
  ESLintPlugin = require('eslint-webpack-plugin'),
  StylelintPlugin = require('stylelint-webpack-plugin'),
  express = require('express'),
  LiveReload = require('./webpack.live-reload-bp');

const 
  liveReload = new LiveReload();

module.exports = {
  stats: "normal",	
  mode: 'development',
  devtool: 'inline-source-map',	
  entry: './src/index.js',
  watchOptions: {
    ignored: /node_modules/,
  },  
  output: {
    path: path.resolve(__dirname, 'dest'),
    filename: 'bundle.js',
  },
  plugins: [
    new ESLintPlugin({ formatter: liveReload.formatterESLint }),
    new StylelintPlugin({
      customSyntax: 'postcss-scss',
      failAfterError: true,
      fix: false,
      formatter: liveReload.formatterStylelint,
    }),
    liveReload
  ], 
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [
	        {
		        loader: 'style-loader',
	        },
	        'css-loader'
        ],
      },
    ],
  },
  devServer: {
    port: 3000,
    liveReload: false,
    hot: false,
    hotOnly: false,
    writeToDisk: false,
    contentBase: './dest',   
  },
};
