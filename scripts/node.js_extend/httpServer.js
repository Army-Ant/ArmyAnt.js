/**
 *
 */

/**
 * Copyright (c) 2015 ArmyAnt
 * 版权所有 (c) 2015 ArmyAnt
 *
 * Licensed under the BSD License, Version 2.0 (the License);
 * 本软件使用BSD协议保护, 协议版本:2.0
 * you may not use this file except in compliance with the License.
 * 使用本开源代码文件的内容, 视为同意协议
 * You can read the license content in the file "LICENSE" at the root of this project
 * 您可以在本项目的根目录找到名为"LICENSE"的文件, 来阅读协议内容
 * You may also obtain a copy of the License at
 * 您也可以在此处获得协议的副本:
 *
 *     http://opensource.org/licenses/BSD-3-Clause
 *
 * Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an AS IS BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * 除非法律要求或者版权所有者书面同意,本软件在本协议基础上的发布没有任何形式的条件和担保,无论明示的或默许的.
 * See the License for the specific language governing permissions and limitations under the License.
 * 请在特定限制或语言管理权限下阅读协议
 */
"use strict";
import libArmyAnt from "../global.js"
import File from "./file.js"
import JsonParser from "../common/jsonParser.js"
import HttpClient from "../common/httpClient.js"

let _content = null;

let _statusCode = null;


/*
 *
 *
 */
export default class HttpServer {


    constructor() {
        this.port = 8080;
        this.listening = false;
        this.listenFunc = null;
        this.onGetting = null;	    // pathname				function(request,response,pathname)
        this.onGet = null;		// {contentType, returnCode, data}	function(request,response,returnCode,contentType, data)
        this.onHeading = null;	// pathname				function(request,response,pathname)
        this.onHead = null;		// {contentType, returnCode}	function(request,response,returnCode,contentType)
        this.onPosting = null;	// canceledReturnCode	function(request,response)
        this.onPost = null;		// returnCode			function(request,response,returnCode,uploadedData)
        this.onPutting = null;	// canceledReturnCode	function(request,response)
        this.onPut = null;		// returnCode			function(request,response,returnCode,uploadedData)
        this.onDeleting = null;	// canceledReturnCode	function(request,response)
        this.onDelete = null;	    // returnCode			function(request,response,returnCode)
        this.onOptions = null;	// void	function(request,response)
        this.onTrace = null;		// void	function(request,response)
        this.onConnect = null;	// void	function(request,response)
    }

    start(port) {
        if (port) {
            if (typeof port === libArmyAnt.magics.types.NUMBER && port > 0 && port < 65535)
                this.port = port;
            else {
                libArmyAnt.error('Argument "port" is invalid in HttpServer.start! The value is ', port);
            }
        }
        while (!this.listening) {
            try {
                let server = libArmyAnt.nodeJs.http.createServer(this._reqResp.bind(this));
                server.listen(this.port);
            } catch (err) {
                libArmyAnt.warn("The port ", this.port, " is busy, try to open the port " + ++this.port);
                continue;
            }
            this.listening = true;
        }
        // console will print the message
        libArmyAnt.log('Server running at port ', this.port);
    }

    _reqResp(request, response) {
        // Print the name of the file for which request is made.
        libArmyAnt.log("Request '", request.method, "' received !");
        switch (request.method) {
            case HttpClient.functionType.get:
                this._onGet(request, response);
                break;
            case HttpClient.functionType.head:
                this._onHead(request, response);
                break;
            case HttpClient.functionType.put:
                this._onPut(request, response);
                break;
            case HttpClient.functionType.post:
                this._onPost(request, response);
                break;
            case HttpClient.functionType.delete:
                this._onDelete(request, response);
                break;
            case HttpClient.functionType.options:
                this._onOptions(request, response);
                break;
            case HttpClient.functionType.trace:
                this._onTrace(request, response);
                break;
            case HttpClient.functionType.connect:
                this._onConnect(request, response);
                break;
            default:
                libArmyAnt.warn("Unknown HTTP request method: ", request.method);
        }
    }

    _onGet(request, response) {
        this._on_download(request, response, false, this.onGetting, this.onGet);
    }

    _onHead(request, response) {
        this._on_download(request, response, true, this.onHeading, this.onHead);
    }

    _onPost(request, response) {
        this._on_upload(request, response, this.onPosting, this.onPost, HttpClient.functionType.post);
    }

    _onPut(request, response) {
        this._on_upload(request, response, this.onPutting, this.onPut, HttpClient.functionType.put);
    }

    _onDelete(request, response) {
        this._on_upload(request, response, this.onDeleting, this.onDelete, HttpClient.functionType.delete);
    }

    _onOptions(request, response) {
        this.onOptions(request, response);
    }

    _onTrace(request, response) {
        this.onTrace(request, response);
    }

    _onConnect(request, response) {
        this.onConnect(request, response);
    }

    _on_download(request, response, isOnlyHead, beforeMethod, afterMethod) {
        let pn = HttpServer.getParamByUrl(request.url).pathname.substr(1);
        let retCode = 0;
        if (beforeMethod)
            pn = beforeMethod(request, response, pn);
        // Parse the request containing file name
        let contentType = null;
        if (pn)
            contentType = HttpServer.getContentTypeByPathname(pn);
        libArmyAnt.log("Get request for ", HttpServer.getParamByUrl(request.url).pathname.substr(1), ", type: ", contentType ? contentType : "unknown");
        // Read the requested file content from file system
        if (pn && !isOnlyHead) {
            File.readFile(libArmyAnt.config.rootDir + pn, function (success, data) {
                retCode = success ? 200 : 404;
                if (afterMethod) {
                    let options = afterMethod(request, response, retCode, contentType, data);
                    if (options.hasOwnProperty("retCode"))
                        retCode = options["returnCode"];
                    if (options.hasOwnProperty("contentType"))
                        contentType = options.contentType;
                    if (options.hasOwnProperty("data"))
                        data = options.data;
                }
                if (!contentType)
                    contentType = "application/octet-stream";
                response["writeHead"](success ? 200 : 404, {'Content-Type': contentType});

                // Write the content of the file to response body
                if (success || data)
                    if (typeof data === libArmyAnt.magics.types.STRING)
                        response.write(data);
                    else if (contentType.substr(0, 4) === "text" || contentType.substr(0, 11) === "application")
                        response.write(data.toString());
                    else
                        response.write(data, "binary");
                response.end();
            });
            return;
        }
        retCode = pn ? 200 : 404;
        if (!afterMethod)
            afterMethod = function () {
                return {data: " "}
            };
        let options = afterMethod(request, response, retCode, contentType);
        if (options.hasOwnProperty("retCode"))
            retCode = options["returnCode"];
        if (options.hasOwnProperty("contentType"))
            contentType = options.contentType;
        if (!contentType)
            contentType = "application/octet-stream";
        response["writeHead"](retCode, {'Content-Type': contentType});
        if (options.hasOwnProperty("data"))
            response.write(options.data);
        response.end();
    }

    _on_upload(request, response, beforeMethod, afterMethod, methodName) {
        request.setEncoding("utf-8");
        let retCode = 0;
        if (beforeMethod)
            retCode = beforeMethod(request, response);
        if (retCode) {
            response.writeHead(retCode, {'Content-Type': 'text/plain'});
            // Send the response body
            response.end();
            return;
        }
        if (methodName !== HttpClient.functionType.delete) {
            let postData = "";
            request.addListener("data", function (postDataChunk) {
                postData += postDataChunk;
            });
            request.addListener("end", function () {
                // let dataParam = libArmyAnt.nodeJs.querystring.parse(postData);
                if (afterMethod)
                    retCode = afterMethod(request, response, 200, postData);
                else
                    retCode = 200;
                response.writeHead(retCode, {'Content-Type': 'text/plain'});
                response.end();
                libArmyAnt.log("Get user upload data successful ! url: +", request.url);
            }.bind(this));
        } else {
            if (afterMethod)
                retCode = afterMethod(request, response, 200);
            else
                retCode = 200;
            response.writeHead(retCode, {'Content-Type': 'text/plain'});
            response.end();
            libArmyAnt.log("Resolve user's deleting request over ! url: +", request.url);
        }
    }

    static getParamByUrl(url) {
        return libArmyAnt.nodeJs.url["parse"](url);
    }

    static getContentTypeByPathname(pathname) {
        let ext = pathname.split('.')[pathname.split('.').length - 1];
        return HttpServer._content[0][ext] ? HttpServer._content[0][ext] : HttpServer._content[1];
    }

    static get _content() {
        if (!_content) {
            let dt = new JsonParser();
            dt.loadJson("../../data/contentType.json");
            _content = dt.data;
        }
        return _content;
    }

    static get _statusCode() {
        if (!_statusCode) {
            let dt = new JsonParser();
            dt.loadJson("../../data/httpStatusCode.json");
            return dt.data;
        }
        return _statusCode;
    }
}

