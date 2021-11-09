# Example - 1 (NodeJs) (live-reload-bp)

Test example of a simple use of **Live Reload Browser Page** and **Live Alert Browser Page**.

**1.** Download or copy [example-1](https://github.com/Yuriy-Svetlov/live-reload-bp/tree/main/documentation/examples/nodejs/1)

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
Change the file `dest/index.html` and your browser page should reload. If you change `tests/TestExampleLiveAlert.js` **Live Alert** panel will be called.

**Congratulation!**