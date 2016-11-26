/**
 * Created by Jason on 2016/5/31.
 */
(function() {
    this.serverHost = {
        onStart: function () {
            var svr = new libArmyAnt.HttpServer();
            svr.start(8080);
        }
    }
})();
require("./libArmyAnt.js")