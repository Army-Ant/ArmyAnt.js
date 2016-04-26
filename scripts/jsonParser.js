/**
 * Created by Jason Z.J on 2015/8/21.
 * @author Jason Z.J
 * @date 2015/8/21
 */

/**
 * The class to download and parse json file async
 */
libArmyAnt.JsonParser = libArmyAnt.Object.Inherit({
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
        if (this.url)
            $.getJSON(url, this._CallBack.bind(this));
        else
            throw "Wrong url string of json file";
    },

    _CallBack: function (data) {
        this.data = data;
    }
});