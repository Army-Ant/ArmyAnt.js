/**
 * Created by Jason on 2016/5/31.
 */
(function() {
    this.serverHost = {
        onStart: function () {
            var svr = new libArmyAnt.Server();
            svr.start();
        }
    }
})();
require("./libArmyAnt.js")