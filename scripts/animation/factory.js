/**
 * Created by Jason Zhao Jie on 2016/12/13.
 */

(function() {
    this.libArmyAnt.animation.factory = new (this.libArmyAnt.Object.inherit({
        manager:[],

        ctor:function(){

        },

        getMaker:function(type){

        }
    }));

    this.libArmyAnt.animation.IMaker = this.libArmyAnt.Object.inherit({
        type:libArmyAnt.animation.realization.unknown,

        ctor:function(){
            throw "This interface cannot be created an object";
        },

        createScene:null,
        createNode:null,
        createSprite:null,
        createLabel:null,
        createLayout:null,
        createBoneUnit:null
    });

    this.libArmyAnt._onInitialized();
})();