'use strict';

const 
  chokidar = require('chokidar'),
  express = require('express'),
  path = require('path'),
  webServer = require('./web-server'),
  liveReloadBP = require("live-reload-bp");

const
  destLiveReload = './dest/**/*.(js|css|php|html)';

const  
  liveReload = new liveReloadBP({
    host: '127.0.0.1',
	  port: '8080'
  });

// Run Server
liveReload.run();

chokidar.watch(destLiveReload).on('change', (path_) => {
  console.log('file changed [Live Reload]');

  let filename = path.basename(path_)
  console.log(filename);

  if(filename === 'index.js'){
    // Partial reload of the browser page
    liveReload.reloadPage({
      action: 'page_reload',
      partial_reload: {
        tag: 'script',    
        src: '/index.js', // '/index.js' or path_ (but probably you need to know a file extension)
        js: {
          //clear_obsolete_tags: ['style'],
          //resetHTML: false,
          use_method_1: {
            send_event_onload: true
          }        
        }
      }      
    });
  }else{
    // Full reload of the browser page
    liveReload.reloadPage();
  }
});

webServer();
