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
  console.log('file "' + path_ + '" changed [Live Reload]');

  let filename = path.basename(path_)

  if(filename === '1.js'){
    /* 
      Partial reload of the browser page
     
      API of browser plugin Live Reload Browser Page 
      https://live-reload-browser-page.com/documentation
    */ 
    liveReload.reloadPage({
      action: 'page_reload',
      partial_reload: {
        tag: 'script',    
        src: '/1.js',
        js: {
          //clear_obsolete_tags: ['style'],
          //resetHTML: false,
          use_method_1: {
            send_event_onload: true
          }        
        }
      }      
    });
  }else
  if(filename === 'styles.css'){
    liveReload.reloadPage({
      action: 'page_reload',
      partial_reload: {
        tag: 'link',    
        href: '/styles.css'
      }      
    });
  }else
  if(filename === 'index.html'){
    liveReload.reloadPage({
      action: 'page_reload',
      partial_reload: {
        tag: 'html',    
        html: {
          force_load_images: false // Usually, images are taken from the browser cache when the HTML is partially reloaded.
        }
      }      
    });
  }else{
    // Full reload of the browser page
    liveReload.reloadPage();
  }
});

webServer();
