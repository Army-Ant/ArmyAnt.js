/**
 * Created by Jason on 2016/5/31.
 */
"use strict";

import HttpServer from "./scripts/node.js_extend/httpServer";

let serverHost = {
    onStart: function () {
        let svr = new HttpServer;
        svr.start("./", 8765);
    },

    onTest: function () {

    }
};

serverHost.onStart();