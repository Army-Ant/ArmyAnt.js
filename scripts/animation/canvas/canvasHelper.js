/**
 * Created by Jason Zhao Jie on 2016/12/21.
 */

libArmyAnt.animation.Canvas.canvasHelper = new (libArmyAnt.Object.inherit({
    ctor: function () {
        this.base.ctor();
    },

    RectPointStyle: {
        default: "miter",
        miter: "miter",
        round: "round",
        bevel: "bevel"
    },

    color: {}
}))();

libArmyAnt._onInitialized();