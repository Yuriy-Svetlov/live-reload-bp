
const 
  path = require('path'),
  webpack = require('webpack'),
  express = require('express'),
  liveReloadBP = require('./webpack.live-reload-bp');


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
    new liveReloadBP()
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
