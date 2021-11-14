
# Example - 3 (Grunt) (live-reload-bp)

How to use «*Partial reload*» in **Live Reload Browser Page** and **Live Alert Browser Page**.

**1.** Download or copy [example-3](https://github.com/Yuriy-Svetlov/live-reload-bp/tree/main/documentation/examples/grunt/3)

**2.** Go to the directory with `Gruntfile.js` and run the command in console: 

```shell
npm install
```

**3.** Double-clisk on **start.bat** or run in console 

```shell
grunt start
```
In the console you should see the following message:

> Server started | host: 127.0.0.1 | port: 8080

**4.** 
Open your browser: http://localhost:3000

**5.** Set up a connection with the plugin. [Example of how to establish a connection to a plugin](https://github.com/Yuriy-Svetlov/live-reload-bp/tree/main/documentation/examples/%D1%81onnect_to_server)

**6.** 
If you change the files `src/index.html`, `src/scss/main.scss`, `src/scss/main/_1.scss` or `src/js/index.js` reload of the browser page will be partial.
If you disable 'Partial reload' in the browser plugin **Live Reload Browser Page** will be full reload of the browser page.
If you make an error or a wanring, the **Live Alert** panel will open (if you have enabled **Live Alert**).


**Congratulation!**
