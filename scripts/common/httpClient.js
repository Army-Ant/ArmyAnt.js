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

        ctor: function () {
            this.base.ctor();
        }

    });

    if (typeof require == "undefined") {
        libArmyAnt.HttpClient = HttpClient;
        libArmyAnt._onInitialized();
    }
    else
        module.exports = HttpClient;
})();