/**
 * Created by Jason Zhao Jie on 2016/12/13.
 */

(function() {
    this.libArmyAnt.animation.factory = new (this.libArmyAnt.Object.inherit({
        manager:[],
        refreshTime:0.0166,

        ctor:function(){

        },

        getMaker:function(type, elem, args){
            switch (type){
                case libArmyAnt.animation.realization.canvas:
                    return new libArmyAnt.animation.Canvas(elem, args.width, args.height, args.style);
                case libArmyAnt.animation.realization.multiCanvas:
                case libArmyAnt.animation.realization.css3:
                case libArmyAnt.animation.realization.svg:
                case libArmyAnt.animation.realization.jQuery:
                case libArmyAnt.animation.realization.webGL:
                default:
                    break;
            }
        }
    }));


    this.libArmyAnt._onInitialized();
})();