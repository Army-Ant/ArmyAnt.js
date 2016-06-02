/**
 * Created by Jason on 2016/5/31.
 */
(function() {
    this.serverHost = {
        OnStart: function () {
            var svr = new libArmyAnt.Server();
            svr.Start();
        }
    }
})();
require("./libArmyAnt.js")