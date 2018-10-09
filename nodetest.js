/**
 * Created by Jason on 2016/5/31.
 */
"use strict";
import libArmyAnt from "./libArmyAnt"

let serverHost = {
    onStart: function () {
        let svr = new libArmyAnt.HttpServer;
        svr.start(8765);
    },

    onTest: function () {

    }
};

serverHost.onStart();