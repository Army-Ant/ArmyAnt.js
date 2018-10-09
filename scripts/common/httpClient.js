/**
 * Created by Jason Zhao Jie on 2016/11/10.
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

/*
 *
 *
 */
export default class HttpClient {

    constructor() {
        this.serverURL = "http://127.0.0.1:80";
        this.beforeSend = null;    // function(XMLHttpRequest), used to change the XMLHttpRequest parameters, before the request sends
        this.complete = null; // function(XMLHttpRequest, requestType), used to resolve something after called back and before you resolve result
        this.success = null;       // function(data, statusNumberString), used to resolve result if the http request is successful
        this.error = null;    // function(XMLHttpRequest, errorMessage, errorExceptionHandle), used to resolve the error callback
    }

    send(type, param, data, contentType, username, password) {
        return $.ajax(this._getAjaxParams(false, type, param, data, contentType, username, password));
    }

    sendSync(type, param, data, contentType, username, password) {
        return $.ajax(this._getAjaxParams(true, type, param, data, contentType, username, password));
    }

    get(param, data) {
        return $.get(this._getUrlByParams(param), data, this.success);
    }

    post(param, data) {
        return $.post(this._getUrlByParams(param), data, this.success);
    }

    _getUrlByParams(obj) {
        if (!obj)
            return this.serverURL;
        else return this.serverURL + '?' + $.param(obj);
    }

    _getAjaxParams(isSync, type, param, data, contentType, username, password) {
        if (!type)
            type = HttpClient.functionType.get;
        let ret = {
            type: type,
            url: this._getUrlByParams(param)
        };
        if (isSync)
            ret.async = false;
        if (data)
            ret.data = data;
        if (contentType)
            ret.contentType = contentType;
        ret.context = this;
        if (this.beforeSend)
            ret.beforeSend = this.beforeSend;
        if (this.complete)
            ret.complete = this.complete;
        if (this.success)
            ret.success = this.success;
        if (this.error)
            ret.error = this.error;
        if (username)
            ret.username = username;
        if (password)
            ret.password = password;
        return ret;
    }
}


HttpClient.functionType = {
    get: "GET",
    post: "POST",
    put: "PUT",
    head: "HEAD",
    delete: "DELETE",
    options: "OPTIONS",
    trace: "TRACE",
    connect: "CONNECT"
};