# Example - 2. (NodeJs) (live-reload-bp)

Test example of how to use «*Partial reload*» in **Live Reload Browser Page**.

**1.** Download or copy [example-2](https://github.com/Yuriy-Svetlov/live-reload-bp/tree/main/documentation/examples/nodejs/2)

**2.** Go to the directory with `package.json`.

Run the command in console: 

```shell
npm install
```

**3.** Double-clisk on **start.bat** or run in console 

```shell
node index.js
```
In the console you should see the following message:

> Server started | host: 127.0.0.1 | port: 8080


**4.** 
Open your browser: http://localhost:3000


**5.** 
Set up a connection with the plugin. [Example of how to establish a connection to the plugin](https://github.com/Yuriy-Svetlov/live-reload-bp/tree/main/documentation/examples/%D1%81onnect_to_server) 


**6.** 
Open the browser plugin **Live Reload Browser Page**, go to 'Local Setting', enable 'Partial reload' and click the "Save" button. Reconnect the browser plugin **Live Reload Browser Page**.


**7.** 
If you change the `dest/index.html`, `dest/1.js`, `dest/styles.css`, the reload browser page will be partial. If you change the `dest/2.js`, the reload browser page will not be partial. If you disable 'Partial reload' in the browser plugin **Live Reload Browser Page** the reload browser page will not be partial. 

\* You may need to disable the cache in the Google Chrome browser developer console.

![Disable cache](https://github.com/Yuriy-Svetlov/live-reload-bp/tree/main/images/disable_cache.png) 


**Congratulation!**
