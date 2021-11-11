'use strict';

const
  liveReloadBP = require("live-reload-bp");

const 
  liveReload = new liveReloadBP({
    host: '127.0.0.1', 
    port: '8080'
  });


class liveReloadWebPack {
  
  constructor() {
    liveReload.run();
  }

  apply(compiler) {
    compiler.hooks.done.tap('LiveReloadBPWebPack', (stats) => {
      
      // hasErrors() and hasWarnings() - This usage is optional. You can not use this, if you want your page to reload anyway
      if(stats.hasErrors() === false && stats.hasWarnings() === false){
        reloadJs();
      }
      
    });
  }

}

module.exports = liveReloadWebPack;


function reloadJs(){
  liveReload.reloadPage({
    action: 'page_reload',
    partial_reload: {
      tag: 'script',    
      src: '/bundle.js',
      js: {
        clear_obsolete_tags: ['style'],
        //resetHTML: false,
        use_method_1: {
          send_event_onload: false
        }        
      }
    }
  });  
}
