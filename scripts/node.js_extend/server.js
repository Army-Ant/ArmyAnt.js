if(libArmyAnt.nodeJs) {

	libArmyAnt.server = libArmyAnt.Object.Inherit({
		port: 8081,
		listenning: false,

		ctor:function(){
			this.base.ctor();
			if(!libArmyAnt.server._content) {
				var dt = new libArmyAnt.JsonParser();
				dt.LoadJson("data/contentType.json");
				libArmyAnt.server._content = dt.data;
			}
		},

		Start: function (port) {
			if(port)
				this.port=port;
			while (!this.listenning) {
				try {
					var server = libArmyAnt.nodeJs.http["createServer"](this._ReqResp);
					server["listen"](this.port);
				} catch (err) {
					this.port++;
					continue;
				}
				this.listenning = true;
			}
			// console will print the message
			console.log('Server running at http://127.0.0.1:' + this.port + '/');
		},

		_ReqResp: function (request, response) {
			// Parse the request containing file name
			var pathname = libArmyAnt.nodeJs.url.parse(request.url).pathname;
			// Print the name of the file for which request is made.
			console.log("Request for " + pathname + " received, type: " + request.contentType);
			// Read the requested file content from file system
			libArmyAnt.nodeJs.fs["readFile"](pathname.substr(1), function (err, data) {
				if (err) {
					console.log(err);
					// HTTP Status: 404 : NOT FOUND
					// Content Type: text/plain
					response["writeHead"](404, {'Content-Type': 'text/plain'});
				} else {
					var ext = pathname.split('.')[pathname.split('.').length - 1];
					if(libArmyAnt.server._content[0][ext])
						response["writeHead"](200, {'Content-Type': libArmyAnt.server._content[0][ext]});
					else
						response["writeHead"](200, {'Content-Type': libArmyAnt.server._content[1]});
					// Write the content of the file to response body
					response.write(data.toString());
				}
				// Send the response body
				response.end();
			});
		}
	});
	libArmyAnt.server._content = null;
}

libArmyAnt._onInited();