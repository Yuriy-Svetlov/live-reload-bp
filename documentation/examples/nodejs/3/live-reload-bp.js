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

  let 
    extname = path.extname(path_),
    filepath = path_.replace('\\', '/');

  filepath = filepath.replace(/^dest/, '');

  if(extname === '.js'){
    reloadJS(filepath);
  }else
  if(extname === '.css'){
    reloadCSS(filepath);
  }else
  if(extname === '.html'){
    reloadHTML();
  }else{
    // Full reload of the browser page
    liveReload.reloadPage();
  }
});


function reloadJS(filepath){
  liveReload.reloadPage({
    action: 'page_reload',
    partial_reload: {
      tag: 'script',    
      src: filepath,
      js: {
        //clear_obsolete_tags: ['style'],
        //resetHTML: false,
        use_method_1: {
          send_event_onload: true
        }        
      }
    }      
  });  
}


function reloadCSS(filepath){
  liveReload.reloadPage({
    action: 'page_reload',
    partial_reload: {
      tag: 'link',    
      href: filepath,
    }      
  });  
}


function reloadHTML(){
  liveReload.reloadPage({
    action: 'page_reload',
    partial_reload: {
      tag: 'html',    
      html: {
        force_load_images: false // Usually, images are taken from the browser cache when the HTML is partially reloaded.
      }
    }      
  });  
}


webServer();
