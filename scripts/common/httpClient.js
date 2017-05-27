/**
 * Created by Jason Zhao Jie on 2016/11/10.
 */

(function () {

    var libArmyAnt;
    if (typeof require == "undefined")
        libArmyAnt = window.libArmyAnt;
    else {
        libArmyAnt = require("../global.js");
        libArmyAnt.Object = require("../object.js");
    }

    /*
     *
     *
     */
    var HttpClient = libArmyAnt.Object.inherit({
        serverURL: "http://127.0.0.1:80",
        beforeSend: null,    // function(XMLHttpRequest), used to change the XMLHttpRequest parameters, before the request sends
        complete: null, // function(XMLHttpRequest, requestType), used to resolve something after called back and before you resolve result
        success: null,       // function(data, statusNumberString), used to resolve result if the http request is successful
        error: null,    // function(XMLHttpRequest, errorMessage, errorExceptionHandle), used to resolve the error callback

        ctor: function () {

        },

        send: function (type, param, data, contentType, username, password) {
            return $.ajax(this._getAjaxParams(false, type, param, data, contentType, username, password));
        },

        sendSync: function (type, param, data, contentType, username, password) {
            return $.ajax(this._getAjaxParams(true, type, param, data, contentType, username, password));
        },

        get: function (param, data) {
            return $.get(this._getUrlByParams(param), data, this.success);
        },

        post: function (param, data) {
            return $.post(this._getUrlByParams(param), data, this.success);
        },

        _getUrlByParams: function (obj) {
            if (!obj)
                return this.serverURL;
            else return this.serverURL + '?' + $.param(obj);
        },

        _getAjaxParams: function (isSync, type, param, data, contentType, username, password) {
            if (!type)
                type = HttpClient.functionType.get;
            var ret = {
                type: type,
                url: this._getUrlByParams(param)
            }
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

    });

    HttpClient.functionType = {
        get: "GET",
        post: "POST",
        put: "PUT",
        head: "HEAD",
        delete: "DELETE",
        options: "OPTIONS",
        trace: "TRACE",
        connect: "CONNECT"
    }

    if (typeof require == "undefined") {
        libArmyAnt.HttpClient = HttpClient;
        libArmyAnt._onInitialized();
    }
    else
        module.exports = HttpClient;
})();