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
      const info = stats.toJson();

      // hasErrors() and hasWarnings() - This usage is optional. You can not use this, if you want your page to reload anyway
      if(stats.hasErrors() === false && stats.hasWarnings() === false){.
        liveReload.reloadPage();
      }
      
    });
  }

}

module.exports = liveReloadWebPack;
