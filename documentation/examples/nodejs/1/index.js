'use strict';

const 
  chokidar = require('chokidar'),
  express = require('express'),
  webServer = require('./web-server'),
  liveReloadBP = require("live-reload-bp");

const
  destLiveReload = './dest/**/*.(js|css|php|html)',
  destLiveAlert = './tests/**/*.(js|css|php|html)';

const  
  liveReload = new liveReloadBP({
    host: '127.0.0.1',
	  port: '8080'
  });

// Run Server
liveReload.run();

chokidar.watch(destLiveReload).on('change', (path) => {
  console.log('file changed [Live Reload]');

  liveReload.reloadPage();
});


chokidar.watch(destLiveAlert).on('change', (path) => {
  console.log('file changed [Live Alert]');

  /* Simple test example for liveAlert
    https://github.com/Yuriy-Svetlov/live-alert-bp
  */
  
  liveReload.liveAlert([
    { label: 'My label-1', message: 'My message-1.'},
    { label: 'My label-2', message: 'My message-2.'},
  ]);

});

webServer();
