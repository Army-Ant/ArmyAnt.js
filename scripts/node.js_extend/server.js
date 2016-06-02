
(function() {
	if (libArmyAnt.nodeJs) {

		this.libArmyAnt.Server = this.libArmyAnt.Object.Inherit({
			port: 8081,
			listening: false,
			listenFunc: null,
			onGet:null,
			onPostBegin:null,
			onPostSend:null,

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
				while (!this.listening) {
					try {
						var server = libArmyAnt.nodeJs.http["createServer"](this.ReqResp.bind(this));
						server["listen"](this.port);
					} catch (err) {
						this.port++;
						continue;
					}
					this.listening = true;
				}
				// console will print the message
				libArmyAnt.log('Server running at port ' + this.port);
			},

			ReqResp: function (request, response) {
				// Print the name of the file for which request is made.
				libArmyAnt.log("Request '"+request.method+"' received !");
				switch (request.method) {
					case 'GET':
						this._OnGet(request, response);
						break;
					case 'HEAD':
						this._OnHead(request, response);
						break;
					case 'PUT':
						this._OnPut(request, response);
						break;
					case 'POST':
						this._OnPost(request, response);
						break;
					case 'DELETE':
						this._OnDelete(request, response);
						break;
					case 'OPTIONS':
						this._OnOptions(request, response);
						break;
					case 'TRACE':
						this._OnTrace(request, response);
						break;
					default:
						libArmyAnt.warn("Unknown HTTP request method: " + request.method);
				}
			},

			ReturnResponseResource:function(response,pathname,contentType){
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
						// Send the response body
						response.end();
					}
				});
			},

			_OnGet:function(request,response) {
				// Parse the request containing file name
				var param = libArmyAnt.Server.GetParamByUrl(request.url);
				var contentType = libArmyAnt.Server.GetContentTypeByPathname(param.pathname);
				libArmyAnt.log("Get request for " + param.pathname + ", type: " + contentType);
				var pn = param.pathname;
				if (this.onGet)
					pn = this.onGet(param);
				// Read the requested file content from file system
				if (pn)
					this.ReturnResponseResource(response, param.pathname, contentType);
				else {
					response["writeHead"](404, {'Content-Type': 'text/plain'});
					response.end();
				}
			},

			_OnHead:function(request, response){

			},

			_OnPost:function(request, response) {
				request["setEncoding"]("utf-8");
				var param = libArmyAnt.Server.GetParamByUrl(request.url);
				if (this.onPostBegin && !this.onPostBegin(param)){
					response["writeHead"](404, {'Content-Type': 'text/plain'});
					// Send the response body
					response.end();
					return;
				}
				var postData = "";
				request["addListener"]("data", function (postDataChunk) {
					postData += postDataChunk;
				});
				request["addListener"]("end", function () {
					var dataParam = libArmyAnt.nodeJs.querystring.parse(postData);
					if(this.onPostSend && !this.onPostSend(dataParam)){
						response["writeHead"](404, {'Content-Type': 'text/plain'});
						// Send the response body
						response.end();
						return;
					}
					response["writeHead"](500, {'Content-Type': 'text/plain;charset=utf-8'});
					response.end();
					libArmyAnt.log("Post request OK! url: +" + request.url);
				});
			},

			_OnPut:function(request, response){

			},

			_OnDelete:function(request, response){

			},

			_OnOptions:function(request, response){

			},

			_OnTrace:function(request, response){

			}
		});

		libArmyAnt.Server._content = null;

		libArmyAnt.Server.GetParamByUrl = function (url) {
			return libArmyAnt.nodeJs.url["parse"](url);
		};

		libArmyAnt.Server.GetContentTypeByPathname = function (pathname) {
			var ext = pathname.split('.')[pathname.split('.').length - 1];
			return libArmyAnt.Server._content[0][ext] ? libArmyAnt.Server._content[0][ext] : libArmyAnt.Server._content[1];
		};

	}

	this.libArmyAnt._onInited();
})();