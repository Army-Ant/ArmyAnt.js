/**
 * Created by Jason Z.J on 2015/8/26.
 * @author Jason Z.J
 * @date 2015/8/26
 */

(function() {

    var libArmyAnt;
    if (typeof require == "undefined")
        libArmyAnt = window.libArmyAnt;
    else {
        libArmyAnt = require("../global.js");
        libArmyAnt.Object = require("../object.js");
    }

    var HTML5 = libArmyAnt.Object.extendSingleton({
        modal: "assets/modals.html",
        data: null,

        ctor: function () {
            var self = this;
            if (libArmyAnt.nodeJs) {
                self.data = libArmyAnt.nodeJs.fs["readFile"]("../" + this.modal, function (err, filedata) {
                    self.data = filedata;
                });
            } else {
                $.ajax({
                    type: "get",
                    url: libArmyAnt.config.dataRootDir + this.modal,
                    cache: true,
                    async: true,
                    dataType: "html",
                    success: function (data, statue, jqXHR) {
                        self.data = data;
                    }
                });
            }
        }

    });

    if (typeof require == "undefined"){
        libArmyAnt.HTML5 = HTML5;
        libArmyAnt._onInitialized();
    }
    else {
        HTML5.Dialog = require("./dialog.js");
        module.exports = HTML5;
    }
})();