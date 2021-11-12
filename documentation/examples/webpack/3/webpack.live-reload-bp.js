'use strict';

const
  liveReloadBP = require("live-reload-bp"),
  liveAlertFormatterESlint = require("live-alert-bp-formatter-eslint"),
  liveAlertFormatterStylelint = require("live-alert-bp-formatter-stylelint");

const 
  liveReload = new liveReloadBP({
    host: '127.0.0.1', 
    port: '8080'
  }),
  liveReloadMsgs = {
    ESLint: []
  };


class liveReloadWebPack {
  
  constructor() {
    liveReload.run();
  }

  apply(compiler) {
    compiler.hooks.done.tap('LiveReloadBPWebPack', (stats) => {
      const info = stats.toJson();


      // [Live Alert] for ESLint
      /*
        # Formaters
        https://github.com/Yuriy-Svetlov/live-alert-bp#formaters
      */
      if(liveReloadMsgs.ESLint.length > 0) {
        stats.compilation.errors.push('LiveAlert ---> ESLint');

        liveReload.liveAlert(
          liveAlertFormatterESlint(liveReloadMsgs.ESLint)
        );        
      }

      // [Live Alert] for Webpack
      if(stats.hasErrors() === true && liveReload.hasError() === false){
        this.formatterWebPack(info.errors, 'Error');
      }else
      if(stats.hasWarnings() === true && liveReload.hasError() === false){
        this.formatterWebPack(info.warnings, 'Warning');
      }

      // hasErrors() and hasWarnings() - This usage is optional. You can not use this, if you want your page to reload anyway
      if(stats.hasErrors() === false && stats.hasWarnings() === false){
        liveReload.reloadPage();
      }

      liveReload.resetError();
      liveReloadMsgs.ESLint = [];

    });
  }


  formatterESLint(msgs){
    liveReloadMsgs.ESLint = liveReloadMsgs.ESLint.concat(msgs);
  }


  formatterStylelint(results, returnValue) {
    if(liveReload.hasError() === false){
      liveReload.liveAlert(
        liveAlertFormatterStylelint(results)
      ); 
    }

    return results;
  }


  formatterWebPack(msgs, labelname){
    let 
      msgsLiveAlert = [],
      backgroundColor,
      color;

    if(labelname === 'Error'){
      backgroundColor = '#ff0000';
      color = '#ffffff';
    }else 
    if(labelname === 'Warning'){
      backgroundColor = '#ffff00';
      color = '#000000';
    }

    msgs.forEach(function(msg){
      msgsLiveAlert.push({
        label: {
          style: { 
              backgroundColor: backgroundColor, 
              color: color 
          }, 
          name: labelname               
        }, 
        message: '<br>'
          + '<span style="opacity: 0.5;">File:</span> ' + msg.moduleName + '<br>'
          + '<span style="opacity: 0.5;">Loc:</span> ' + msg.loc + '<br>'
          + '<span style="opacity: 0.5;">Reason:</span> ' + msg.message
      });
    }); 

    liveReload.liveAlert(msgsLiveAlert);
  }

}

module.exports = liveReloadWebPack;
