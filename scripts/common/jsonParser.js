/**
 * Created by Jason Z.J on 2015/8/21.
 * @author Jason Z.J
 * @date 2015/8/21
 */

/**
 * The class to download and parse json file async
 */
(function() {

    var libArmyAnt;
    if (typeof require == "undefined")
        libArmyAnt = window.libArmyAnt;
    else {
        libArmyAnt = require("../global.js");
        libArmyAnt.Object = require("../object.js");
    }

    var JsonParser = libArmyAnt.Object.inherit({
        url: null,
        data: null,

        ctor: function (url) {
            if (url)
                this.url = url;
        },

        /**
         * To get and parse the json file async
         * 异步获取并解析json (node环境下为同步载入json数据)
         * @param url : string
         *      The net url or file path of json file
         */
        loadJson: function (url) {
            this.data = null;
            if (url)
                this.url = url;
            if (typeof require != "undefined") {
                this.data = require("./" + url);
            }
            else if (this.url)
                $.ajax({
                    type: "get",
                    url: this.url,
                    cache: true,
                    async: false,
                    dataType: "json",
                    success: function (data) {
                        this.data = data;
                    }.bind(this)
                });
            else
                throw "Error url string for json file";
        }
    });

    /**
     * 调用此函数, 以在不创建对象的情况下, 异步读取json数据, 并将数据传入回调方法
     * @param url : String
     * @param callback : Function
     * @returns {*}
     */
    JsonParser.getJson = function (url, callback) {
        return (typeof require == "undefined") ?
            $.ajax({
                type: "get",
                url: url,
                cache: true,
                async: false,
                dataType: "json",
                success: callback
            }) : callback(require("./" + url));
    };

    if (typeof require == "undefined"){
        libArmyAnt.JsonParser = JsonParser;
        libArmyAnt._onInitialized();
    }
    else
        module.exports = JsonParser;
})();