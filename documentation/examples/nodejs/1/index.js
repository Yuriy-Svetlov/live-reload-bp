'use strict';

const 
  chokidar = require('chokidar'),
  express = require('express'),
  webServer = require('./web-server'),
  liveReloadBP = require("live-reload-bp");

const
  dest = './dest/**/*.(js|css|php|html)',
  liveReload = new liveReloadBP({
    host: '127.0.0.1',
	  port: '8080'
  });

// Run Server
liveReload.run();

chokidar.watch(dest).on('change', (path) => {
  console.log('file changed');

  liveReload.reloadPage();
});

webServer();
