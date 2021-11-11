# Example - 2 (Webpack) (live-reload-bp)

How to use «*Partial reload*» in **Live Reload Browser Page**.

**1.** Download or copy [example-2](https://github.com/Yuriy-Svetlov/live-reload-bp/tree/main/documentation/examples/webpack/2)

**2.** Go to the directory with `webpack.config.js` and run the command in console: 

```shell
npm install
```

**3.** Double-clisk on **watch.bat** or run in console 

```shell
npm run watch
```
In the console you should see the following message:

> Server started | host: 127.0.0.1 | port: 8080

**4.** 
Open your browser: http://localhost:3000

**5.** Set up a connection with the plugin. [Example of how to establish a connection to a plugin](https://github.com/Yuriy-Svetlov/live-reload-bp/tree/main/documentation/examples/%D1%81onnect_to_server)

**6.** If you change the files `src/index.js`, `src/css/1.css` or `src/css/2.css`, reload of the browser page will be partial.

**Congratulation!**
