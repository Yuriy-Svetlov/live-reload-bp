/**
 * Copyright (c) Yuriy Svetlov
 * https://github.com/Yuriy-Svetlov
 * 
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const
  fs = require('fs'),
  https = require('https'),
  WebSocket = require('ws'),
  COLOR__YELLOW = '\x1b[93m%s\x1b[0m',
  COLOR__RED = '\x1b[31m%s\x1b[0m';

var 
  debug = false;


class Server{

	constructor(options){
		if(options.port === undefined){
			this.port = 8080;
		}else{
			this.port = options.port;
		}

		if(options.host === undefined){
			this.host = '127.0.0.1';
		}else{
			this.host = options.host;
		}		

		this.wss = null;
		this.ssl = options.ssl;
		debug = options.debug;
		this.error = false;
	}


	run(){
		if(this.ssl !== undefined && this.ssl.enable === true){
			/* 
			    # tls_createsecurecontext_options
				https://nodejs.org/api/tls.html#tls_tls_createsecurecontext_options
			 */
			if(validationSSL_options(this.ssl.options) == false){
				console.log(" The server does not start.");
				return false;
			}

			this.ssl.options.key = getFileData(this.ssl.options.key);
			this.ssl.options.cert = getFileData(this.ssl.options.cert);
			this.ssl.options.ca = getFileData(this.ssl.options.ca);

			this.wss = new WebSocket.Server({ 
				server: https.createServer(this.ssl.options).listen(this.port) 
			});

			console.log(" Server started with SSL connection | host: "+this.host+" | port: "+this.port);
		}else{
			this.wss = new WebSocket.Server({ host: this.host, port: this.port });
			console.log(" Server started | host: "+this.host+" | port: "+this.port);
		}
		
		
		if(debug === true){
			this.wss.on('connection', function connection(ws) {
			 	console.log(' New connection');
			 	ws.on('close', function close() {
					console.log(' disconnected');
				});
			});
		}
		
	
		function validationSSL_options(options){
			if(options === undefined){
				console.log(COLOR__RED, '[ssl_options] is undefined.');
				return false;
			}

			if(options.key === undefined){
				console.log(COLOR__RED, '[ssl_options.key] is undefined.');
				return false;
			}

			if(options.cert === undefined){
				console.log(COLOR__RED, '[ssl_options.cert] is undefined.');
				return false;
			}

			if(fs.existsSync(options.key) === false){
				console.log(COLOR__RED, 'The file does not exist: '+options.key);
				return false;
			}

			if(fs.existsSync(options.cert) === false){
				console.log(COLOR__RED, 'The file does not exist: '+options.cert);
				return false;
			}
		}
	}


	reloadPage(data = {}){
		if(this.hasError() != true && this.wss != undefined){
	    this.wss.clients.forEach(function each(client) {
        
        if(client.readyState === WebSocket.OPEN) {
          
          client.send(JSON.stringify({
            action: 'page_reload',
            partial_reload: get_options__partial_reload(data.partial_reload)
          }));

          if(debug === true){
            console.log('[Live Reload-BP] ' + getDateTime());
          }
        }

	    });
		}

		function get_options__partial_reload(options){
			if(options == undefined){
				return undefined;
			}
			
			if(options.tag == undefined){
				console.log(COLOR__YELLOW, 'You must specify `tag` for partially reload.');
				return undefined;
			}

			if(options.tag === 'link'){
				if(options.href == undefined){
					console.log(COLOR__YELLOW, 'You must specify `href` for `link` in partially reload.');
					return undefined;
				}
			}else 
			if(options.tag === 'script'){
				// Default values
				if(options.js == undefined){
					options.js = {};
					options.js.use_method_1 = {};
		        	options.js.use_method_1.send_event_onload = true;
				}else{
					if( options.js.use_method_1 !== true && options.js.use_method_1 === undefined && 
						options.js.use_method_2 !== true && options.js.use_method_2 === undefined && 
						options.js.use_method_3 !== true && options.js.use_method_3 === undefined){
						
						console.log(COLOR__YELLOW, 'You must specify method for partial reload `script`.');
					}
				}

				if(options.src == undefined){
					console.log(COLOR__YELLOW, 'You must specify `src` for partial reload `script`.');
					return undefined;
				}
			}else 
			if(options.tag === 'html'){
				// Default values
				if(options.html == undefined){
					options.html = {};
					options.html.force_load_images = false;
				}else{
					if(options.html.force_load_images == undefined){
						options.html.force_load_images = false;
					}
				}		
			}
								
			return options;
		}			
	}


	liveAlert(message){
		if(message.length > 0){
			this.error = true;

			if(this.wss != undefined){
		    this.wss.clients.forEach(function each(client) {
	        
	        if(client.readyState === WebSocket.OPEN) {
	          client.send(JSON.stringify({
	            action: 'live_alert',
	            message: message
	          }));

	          console.log('[Live Alert] ' + getDateTime());
	        }
	        
		    });	
			}	
		}	
	}


  hasError(){
		return this.error;
  }


  resetError(){
		this.error = false;
  }


  setError(){
		this.error = true;
  }

}

module.exports = Server;


function getFileData(path){
	if(path === undefined){
		return null;
	}

	if(fs.existsSync(path) === false){
		return null;
	}

	return fs.readFileSync(path);
}


function getDateTime(){
  const 
    now = new Date();

  let
    hour = now.getHours(),
    minute = now.getMinutes(),
    second = now.getSeconds(), 
    milliseconds = now.getMilliseconds();

  if(hour.toString().length == 1) {
    hour = '0'+hour;
  }

  if(minute.toString().length == 1) {
    minute = '0'+minute;
  }

  if(second.toString().length == 1) {
    second = '0'+second;
  }   

  return hour+':'+minute+':'+second+':'+milliseconds;
}
