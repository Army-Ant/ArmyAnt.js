/**
 * Created by Jason on 2016/5/31.
 */
"use strict";
import libArmyAnt from "./libArmyAnt"

let serverHost = {
    onStart: function () {
        let svr = new libArmyAnt.HttpServer();
        console.log(Object.getPrototypeOf(svr) === Object.prototype);
        //svr.start(8765);
        libArmyAnt.HttpServer.prototype.start.call(svr)
    },

    onTest: function () {

    }
}

serverHost.onStart();