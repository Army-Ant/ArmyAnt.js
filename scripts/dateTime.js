/**
 * Created by Jason Zhao Jie on 2016/11/1.
 */

(function() {

    /*
     *
     *
     */
    this.libArmyAnt.DateTime = this.libArmyAnt.Object.inherit({
        jsTime:0,

        ctor:function(){
            this.base.ctor();
            this.ansiTime = (new Date());
        }

    });




    this.libArmyAnt._onInitialized();
})();