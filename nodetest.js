/**
 * Created by Jason on 2016/5/31.
 */
"use strict";

global.serverHost = {
    onStart: function () {
        var svr = new libArmyAnt.HttpServer();
        svr.start(8765);
    },

    onTest: function () {
        var f1 = function () {
            for (var k in this) {
                if (!Object.getPrototypeOf(this).hasOwnProperty(k) || k === "base")
                    continue;
                if (typeof this[k] === "object") {
                    var oldObj = this[k];
                    this[k] = Object.copy(oldObj);
                }
            }
        };
        f1.prototype.v1 = [12, 13];
        var o1 = new f1;
        var o2 = new f1;
        //Object.copyTo(f1.prototype.v1, o2, "v1");
        o2.v1[1] = 15;
        console.log("o1.v1=" + o1.v1);
    }
};

var libArmyAnt = require("./libArmyAnt.js");