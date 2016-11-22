
(function() {
	if (libArmyAnt.nodeJs) {

		/*
		 *
		 *
		 */
		this.libArmyAnt.HttpServer = this.libArmyAnt.Object.inherit({
			port: 80,
			listening: false,
			listenFunc: null,
			onGet:null,
			onPostBegin:null,
			onPostSend:null,


			ctor: function () {
				this.base.ctor();
			},

			start: function (port) {
				if (port) {
					if(typeof port == "number" && port > 0 && port < 65535)
						this.port = port;
					else{
						libArmyAnt.error('Argument "port" is invalid in HttpServer.start! The value is ', port);
					}
				}
				while (!this.listening) {
					try {
						var server = libArmyAnt.nodeJs.http["createServer"](this._reqResp.bind(this));
						server["listen"](this.port);
					} catch (err) {
						++this.port;
						continue;
					}
					this.listening = true;
				}
				// console will print the message
				libArmyAnt.log('Server running at port ', this.port);
			},

			_reqResp: function (request, response) {
				// Print the name of the file for which request is made.
				libArmyAnt.log("Request '", request.method, "' received !");
				switch (request.method) {
					case 'GET':
						this._onGet(request, response);
						break;
					case 'HEAD':
						this._onHead(request, response);
						break;
					case 'PUT':
						this._onPut(request, response);
						break;
					case 'POST':
						this._onPost(request, response);
						break;
					case 'DELETE':
						this._onDelete(request, response);
						break;
					case 'OPTIONS':
						this._onOptions(request, response);
						break;
					case 'TRACE':
						this._onTrace(request, response);
						break;
					default:
						libArmyAnt.warn("Unknown HTTP request method: ", request.method);
				}
			},

			_returnResponseResource:function(response,pathname,contentType){
				libArmyAnt.File.readFile(pathname.substr(1), function (success, data) {
					if (success){
						response["writeHead"](200, {'Content-Type': contentType});
						// Write the content of the file to response body
						if (contentType.substr(0, 4) == "text" || contentType.substr(0, 11) == "application")
							response["write"](data.toString());
						else
							response["write"](data, "binary");
					}else {
						response["writeHead"](404, {'Content-Type': 'text/plain'});
					}
				});
			},

			_onGet:function(request,response) {
				// Parse the request containing file name
				let param = libArmyAnt.HttpServer.getParamByUrl(request.url);
				let contentType = libArmyAnt.HttpServer.getContentTypeByPathname(param.pathname);
				libArmyAnt.log("Get request for ", param.pathname, ", type: ", contentType);
				let pn = param.pathname;
				if (this.onGet)
					pn = this.onGet(param, response);
				// Read the requested file content from file system
				if (pn)
					this._returnResponseResource(response, param.pathname, contentType);
				else {
					response["writeHead"](404, {'Content-Type': 'text/plain'});
				}
				response.end();
			},

			_onHead:function(request, response){

			},

			_onPost:function(request, response) {
				request["setEncoding"]("utf-8");
				var param = libArmyAnt.HttpServer.getParamByUrl(request.url);
				if (this.onPostBegin && !this.onPostBegin(param, response)){
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
					if(this.onPostSend && !this.onPostSend(dataParam, response)){
						response["writeHead"](404, {'Content-Type': 'text/plain'});
						// Send the response body
						response.end();
						return;
					}
					response["writeHead"](500, {'Content-Type': 'text/plain;charset=utf-8'});
					response.end();
					libArmyAnt.log("Post request OK! url: +", request.url);
				});
			},

			_onPut:function(request, response){

			},

			_onDelete:function(request, response){

			},

			_onOptions:function(request, response){

			},

			_onTrace:function(request, response){

			}
		});

		let dt = new libArmyAnt.JsonParser();
		dt.loadJson("../data/contentType.json");
		libArmyAnt.HttpServer._content = dt.data;
		dt = new libArmyAnt.JsonParser();
		dt.loadJson("../data/httpStatusCode.json");
		libArmyAnt.HttpServer._statusCode = dt.data;

		libArmyAnt.HttpServer.getParamByUrl = function (url) {
			return libArmyAnt.nodeJs.url["parse"](url);
		};

		libArmyAnt.HttpServer.getContentTypeByPathname = function (pathname) {
			let ext = pathname.split('.')[pathname.split('.').length - 1];
			return libArmyAnt.HttpServer._content[0][ext] ? libArmyAnt.HttpServer._content[0][ext] : libArmyAnt.HttpServer._content[1];
		};

	}

	this.libArmyAnt._onInitialized();
})();