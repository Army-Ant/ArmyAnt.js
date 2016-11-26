/**
 * Created by Jason Z.J on 2015/8/26.
 * @author Jason Z.J
 * @date 2015/8/26
 */

(function() {
    this.libArmyAnt.HTML5 = new (this.libArmyAnt.Object.inherit({
        modal: "assets/modals.html",
        data: null,

        ctor: function () {
            var self = this;
            if (libArmyAnt.nodeJs) {
                self.data = libArmyAnt.nodeJs.fs["readFile"]("../" + this.modal, function (err, filedata) {
                    self.data = filedata;
                });
            } else { $.ajax({
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

    }))();

    this.libArmyAnt._onInitialized();
})();