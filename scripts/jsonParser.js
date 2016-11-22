/**
 * Created by Jason Z.J on 2015/8/21.
 * @author Jason Z.J
 * @date 2015/8/21
 */

/**
 * The class to download and parse json file async
 */
(function() {
    this.libArmyAnt.JsonParser = this.libArmyAnt.Object.inherit({
        url: null,
        data: null,

        ctor: function (url) {
            this.base.ctor();
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
            if (libArmyAnt.nodeJs) {
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
    this.libArmyAnt.JsonParser.getJson = function (url, callback) {
        return libArmyAnt.nodeJs ?
            callback(require("./" + url)) :
            $.ajax({
            type: "get",
            url: url,
            cache: true,
            async: false,
            dataType: "json",
            success: callback
        });
    };

    this.libArmyAnt._onInitialized();

})();