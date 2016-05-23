
(function() {
	if (libArmyAnt.nodeJs) {

		this.libArmyAnt.Server = this.libArmyAnt.Object.Inherit({
			port: 8081,
			listenning: false,

			ctor: function () {
				this.base.ctor();
				if (!libArmyAnt.Server._content) {
					var dt = new libArmyAnt.JsonParser();
					dt.LoadJson("../data/contentType.json");
					libArmyAnt.Server._content = dt.data;
				}
			},

			Start: function (port) {
				if (port)
					this.port = port;
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
				var ext = pathname.split('.')[pathname.split('.').length - 1];
				var contentType = libArmyAnt.Server._content[0][ext] ? libArmyAnt.Server._content[0][ext] : libArmyAnt.Server._content[1];
				// Print the name of the file for which request is made.
				console.log("Request for " + pathname + " received, type: " + contentType);
				// Read the requested file content from file system
				libArmyAnt.nodeJs.fs["readFile"](pathname.substr(1), function (err, data) {
					if (err) {
						console.log(err);
						// HTTP Status: 404 : NOT FOUND
						// Content Type: text/plain
						response["writeHead"](404, {'Content-Type': 'text/plain'});
					} else {
						response["writeHead"](200, {'Content-Type': contentType});
						// Write the content of the file to response body

						if (contentType.substr(0, 4) == "text" || contentType.substr(0, 11) == "application")
							response.write(data.toString());
						else
							response.write(data, "binary");
					}
					// Send the response body
					response.end();
				});
			}
		});

		libArmyAnt.Server._content = null;
	}

	this.libArmyAnt._onInited();
})();