/**
 * Created by Jason Zhao Jie on 2016/12/13.
 */

(function() {
    this.libArmyAnt.animation.factory = new (this.libArmyAnt.Object.inherit({
        manager:[],

        ctor:function(){

        },

        getMaker:function(type){
            switch (type){
                case libArmyAnt.animation.realization.canvas:
                    return new libArmyAnt.animation.Canvas;
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

    this.libArmyAnt.animation.IMaker = this.libArmyAnt.Object.inherit({
        type:libArmyAnt.animation.realization.unknown,

        ctor:function(){
            throw "This interface cannot be created an object";
        },

        addToElem:null,
        createScene:null,
        createNode:null,
        createSprite:null,
        createLabel:null,
        createLayout:null,
        createBoneUnit:null
    });

    this.libArmyAnt._onInitialized();
})();