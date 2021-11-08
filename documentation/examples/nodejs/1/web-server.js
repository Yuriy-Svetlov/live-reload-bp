'use strict';

const 
  express = require('express');

const 
  app = express(),
  port = 3000,
  host = 'localhost';


module.exports = function(){
  app.use(express.static(__dirname));

  app.get('/', function (req, res) {

    res.sendFile('./index.html', {root: __dirname })
  });

  app.listen(port, host, () => console.log(`Open your browser: http://${host}:${port}`))
};
