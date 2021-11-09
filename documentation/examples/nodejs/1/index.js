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

  /* for
  liveReload.liveAlert([
    { label: 'My label-1', message: 'My message-1.'},
    { label: 'My label-2', message: 'My message-2.'},
  ]);
  */
});

webServer();
