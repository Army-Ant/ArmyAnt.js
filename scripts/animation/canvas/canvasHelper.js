/**
 * Created by Jason Zhao Jie on 2016/12/21.
 */

(function() {
    this.libArmyAnt.animation.Canvas.canvasHelper = new (this.libArmyAnt.Object.inherit({
        ctor:function(){
            this.base.ctor();
        },

        RectPointStyle:{
            default:"miter",
            miter:"miter",
            round:"round",
            bevel:"bevel"
        },

        color:{

        }
    }))();

    this.libArmyAnt._onInitialized();
})();