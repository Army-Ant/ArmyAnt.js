/**
 * Created by Jason Zhao Jie on 2016/12/12.
 */

libArmyAnt.animation = new (libArmyAnt.Object.inherit({
    style: "assets/animation.css",
    data: null,

    ctor: function () {
        var self = this;
        $.ajax({
            type: "get",
            url: libArmyAnt.config.dataRootDir + this.style,
            cache: true,
            async: true,
            dataType: "text",
            success: function (data, statue, jqXHR) {
                self.data = data;
            }
        });
    },

    realization: {
        unknown: "unknown",
        canvas: "canvas",
        multiCanvas: "multiCanvas",
        css3: "css3",
        svg: "SVG",
        jQuery: "jQuery",
        webGL: "webGL",
        flash: "flash"
    }

}));

libArmyAnt._onInitialized();