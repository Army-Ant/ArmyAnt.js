
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
			onGetting:null,
			onGet:null,
			onHeading:null,
			onHead:null,
			onPosting:null,
			onPost:null,
			onPutting:null,
			onPut:null,


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
						var server = libArmyAnt.nodeJs.http.createServer(this._reqResp.bind(this));
						server.listen(this.port);
					} catch (err) {
						libArmyAnt.warn("The port ", this.port, " is busy, try to open the port " + ++this.port);
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
				this._on_download(request, response, false, this.onGetting, this.onGet);
				response.end();
			},

			_onHead:function(request, response){
				this._on_download(request, response, true, this.onHeading, this.onHead);
				response.end();
			},

			_onPost:function(request, response) {
				this._on_upload(request, response, null, this.onPosting, this.onPost);
			},

			_onPut:function(request, response){
				this._on_upload(request, response, null, this.onPutting, this.onPut);
			},

			_onDelete:function(request, response){

			},

			_onOptions:function(request, response){

			},

			_onTrace:function(request, response){

			},

			_on_download:function(request, response, isOnlyHead, beforeMethod, afterMethod){
				var param = libArmyAnt.HttpServer.getParamByUrl(request.url);
				if (beforeMethod)
					pn = beforeMethod(param, response)
				// Parse the request containing file name
				var contentType = libArmyAnt.HttpServer.getContentTypeByPathname(param.pathname);
				libArmyAnt.log("Get request for ", param.pathname, ", type: ", contentType);
				var pn = param.pathname?true:false;
				// Read the requested file content from file system
				if (pn === true && !isOnlyHead)
					this._returnResponseResource(response, param.pathname, contentType);
				else if(pn)
					response["writeHead"](200, {'Content-Type': contentType});
				else
					response["writeHead"](404, {'Content-Type': 'text/plain'});
				if (afterMethod)
					pn = afterMethod(param, response);
			},

			_on_upload:function(request, response, pointedPos, beforeMethod, afterMethod){
				request["setEncoding"]("utf-8");
				var param = libArmyAnt.HttpServer.getParamByUrl(request.url);
				if (beforeMethod && !beforeMethod(param, response)){
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
					// var dataParam = libArmyAnt.nodeJs.querystring.parse(postData);
					if(afterMethod && !afterMethod(postData, param, response)){
						response["writeHead"](404, {'Content-Type': 'text/plain'});
						// Send the response body
						response.end();
						return;
					}
					response["writeHead"](200, {'Content-Type': 'text/plain;charset=utf-8'});
					response.end();
					libArmyAnt.log("Get user upload data successful ! url: +", request.url);
				}.bind(this));
			}
		});

		var dt = new libArmyAnt.JsonParser();
		dt.loadJson("../data/contentType.json");
		libArmyAnt.HttpServer._content = dt.data;
		dt = new libArmyAnt.JsonParser();
		dt.loadJson("../data/httpStatusCode.json");
		libArmyAnt.HttpServer._statusCode = dt.data;

		libArmyAnt.HttpServer.getParamByUrl = function (url) {
			return libArmyAnt.nodeJs.url["parse"](url);
		};

		libArmyAnt.HttpServer.getContentTypeByPathname = function (pathname) {
			var ext = pathname.split('.')[pathname.split('.').length - 1];
			return libArmyAnt.HttpServer._content[0][ext] ? libArmyAnt.HttpServer._content[0][ext] : libArmyAnt.HttpServer._content[1];
		};

	}

	this.libArmyAnt._onInitialized();
})();