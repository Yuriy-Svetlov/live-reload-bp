# live-reload-bp (Live Reload Browser Page)

![Live Reload Browser Page](https://raw.githubusercontent.com/Yuriy-Svetlov/live-reload-bp/main/images/on_128x128_v1.png)

This module is for the browser plugin «[Live Reload Browser Page](https://live-reload-browser-page.com)» — this is the browser plugin for live reload the browser page during web development.

[live-reload-browser-page.com](https://live-reload-browser-page.com)

You may also want to use (In the Pro version of «Live Reload Browser Page», all these plugins are already built in): 
* [live-alert-browser-page.com](https://live-alert-browser-page.com)
* [live-html-validator.com](https://live-html-validator.com)

![Live Reload Browser Page](https://raw.githubusercontent.com/Yuriy-Svetlov/live-reload-bp/main/images/main.png)

## Installs

**Step - 1** 

You need to install the browser plugin [Live Reload Browser Page](https://live-reload-browser-page.com) if you have not already installed it for:
  * [Google Chrome](#)
  * Firefox (not yet available)
  
**Step - 2**
```shell
npm i live-reload-bp --save-dev
```

##  How to use

[Example of how to establish a connection to the plugin «**Live Reload Browser Page**»](https://github.com/Yuriy-Svetlov/live-reload-bp/tree/main/documentation/examples/%D1%81onnect_to_server)

```javascript
const 
  liveReload = require("live-reload-bp");

const  
  liveReloadMain = new liveReload({
    host: '127.0.0.1',
    port: '8080'
  });

// Run Server
liveReloadMain.run();

console.log('Within 10 seconds, you need to connect to this server using the browser plugin «Live Reload Browser Page».');

setTimeout(function(){
  // Full reload of the browser page
  liveReloadMain.reloadPage();
}, 10000);
```

##  Examples:

* [NodeJs](https://github.com/Yuriy-Svetlov/live-reload-bp/tree/main/documentation/examples/nodejs) (To better understand how to use this tool, it is recommended that you Get Started.)
* [Gulp](https://github.com/Yuriy-Svetlov/live-reload-bp/blob/main/documentation/examples/gulp/README.md)
* [Webpack](https://github.com/Yuriy-Svetlov/live-reload-bp/blob/main/documentation/examples/webpack/README.md)
* [Grunt](#)


##  API


##  Browser plugin API

[API of browser plugin **Live Reload Browser Page**](https://live-reload-browser-page.com/documentation)
