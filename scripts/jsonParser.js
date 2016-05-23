/**
 * Created by Jason Z.J on 2015/8/21.
 * @author Jason Z.J
 * @date 2015/8/21
 */

/**
 * The class to download and parse json file async
 */
(function() {
    this.libArmyAnt.JsonParser = this.libArmyAnt.Object.Inherit({
        url: null,
        data: null,

        ctor: function (url) {
            this.base.ctor();
            if (url)
                this.url = url;
        },

        /**
         * To get and parse the json file async
         * @param url : string
         *      The net url or file path of json file
         */
        LoadJson: function (url) {
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
        },
    });

    this.libArmyAnt.JsonParser.GetJson = function (url, callback) {
        return $.ajax({
            type: "get",
            url: url,
            cache: true,
            async: false,
            dataType: "json",
            success: callback
        });
    };

    this.libArmyAnt._onInited();

})();