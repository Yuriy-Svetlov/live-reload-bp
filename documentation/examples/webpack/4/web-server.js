'use strict';

const 
  path = require('path'),
  express = require('express');

const 
  app = express(),
  port = 3000,
  host = 'localhost';


module.exports = function(){
  app.get('/', (req, res) => {
    res.sendfile('dest/index.html');
  });

  app.use(express.static(path.join(__dirname, 'dest')))

  app.listen(port, host, () => console.log(` Open your browser: http://${host}:${port}`))
};
