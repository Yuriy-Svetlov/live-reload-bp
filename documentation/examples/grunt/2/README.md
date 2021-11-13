
# Example - 2 (Grunt) (live-reload-bp)

Simple use of **Live Reload Browser Page** and **Live Alert Browser Page**.

**1.** Download or copy [example-2](https://github.com/Yuriy-Svetlov/live-reload-bp/tree/main/documentation/examples/grunt/2)

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

**6.** Change the file `src/scss/main.scss` or `src/scss/main/_1.scss`. The browser page will reload and you will hear a sound and a visual notification. If you make an error or a wanring, the **Live Alert** panel will open (if you have enabled **Live Alert**).

**Congratulation!**
