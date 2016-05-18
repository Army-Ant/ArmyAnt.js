/**
 * Created by Jason Z.J on 2015/8/25.
 * @author Jason Z.J
 * @date 2015/8/25
 */

/**
 * The class used in libArmyAnt.ObjectPool
 */
libArmyAnt.ObjectElement = libArmyAnt.Object.Inherit({
    id:null,
    staticPart:{},

    ctor:function(){
        this.base.ctor();
    },

    reuse:function(){
        
    }
});

/**
 * The class for object pool modal, you should only input ObjectElement and its inherit class object into this pool
 */
libArmyAnt.ObjectPool = libArmyAnt.Object.Inherit({
    elements:[],

    ctor:function(){
        this.base.ctor();
    },

    obtain:function(type){

    },

    clear:function(){

    }
});

libArmyAnt._onInited();