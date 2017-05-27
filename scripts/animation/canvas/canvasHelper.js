/**
 * Created by Jason Zhao Jie on 2016/12/21.
 */

libArmyAnt.animation.Canvas.canvasHelper = libArmyAnt.Object.extendSingleton({
    ctor: function () {
    },

    RectPointStyle: {
        default: "miter",
        miter: "miter",
        round: "round",
        bevel: "bevel"
    },

    color: {}
});

libArmyAnt._onInitialized();