# Example - 1 (NodeJs) (live-html-validator)

**1.** Download or copy [example-1](https://github.com/Yuriy-Svetlov/live-html-validator/tree/main/documentation/examples/nodejs/1)

**2.** Go to the directory with `index.html`.

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


**5.** Set up a connection with the plugin. [Example of how to establish a connection to a plugin](https://github.com/Yuriy-Svetlov/live-html-validator/tree/main/documentation/examples/%D1%81onnect_to_server)

**6.** Change the file `index.html` (make an error or a warning). As example you can change from `<html lang="en">` to `<html>`, or from `<img class="logo" src="/img/1.png" alt="logo" style="z-index: 0;">` to `<img class="logo" src="/img/1.png" style="z-index: 0;">`

**Congratulation!**

You should hear a sound and see a visual notifications of an invalid HTML validation of the page.
