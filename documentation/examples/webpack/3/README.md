# Example - 3 (Webpack) (live-reload-bp)

Using **Live Reload Browser Page** and **Live Alert Browser Page**.

**1.** Download or copy [example-3](https://github.com/Yuriy-Svetlov/live-reload-bp/tree/main/documentation/examples/webpack/3)

**2.** Go to the directory with `webpack.config.js` and run the command in console: 

```shell
npm install
```

**3.** Double-clisk on **start.bat** or run in console 

```shell
npm run start
```
In the console you should see the following message:

> Server started | host: 127.0.0.1 | port: 8080

**4.** Set up a connection with the plugin. [Example of how to establish a connection to a plugin](https://github.com/Yuriy-Svetlov/live-reload-bp/tree/main/documentation/examples/%D1%81onnect_to_server)

**5.** 
Change the file `src/index.js`, `src/css/1.css` or `src/css/2.css`. The browser page will reload and you will hear a sound and a visual notification. If you make an error or a warning, the **Live Alert** panel will open (if you have enabled **Live Alert**).

**Congratulation!**
