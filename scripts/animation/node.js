/**
 * Created by Jason Zhao Jie on 2016/12/13.
 */

(function() {

    this.libArmyAnt.animation.INode = this.libArmyAnt.Object.inherit({
        scene:null,
        parent:null,
        x:0,
        y:0,
        width:0,
        height:0,
        zIndex:0,

        shown:true,
        timer:null,

        children:null,

        ctor:function(){
            throw "This interface cannot be created an object";
        },

        _ctor:function(parent, scene, zIndex, x, y, width, height){
            this.base.ctor();
            this.x = x;
            this.y = y;
            this.width = width;
            this.height = height;
            this.zIndex = zIndex;
            this.scene = scene;
            if(parent)
                this.parent = parent;
            this.timer = new libArmyAnt.Scheduler(this.libArmyAnt.animation.factory.refreshTime);
            this.timer.run(this.update.bind(this));
        },

        show:null,
        hide:null,
        pause:null,
        resume:null,
        addChild:null,
        removeChild:null,
        createChild:null,
        removeAllChildren:null,
        setParent:null,
        removeSelf:function(){
            delete this.parent.children.lists[tag];
        },
        refresh:null,
        update:null
    });

    this.libArmyAnt._onInitialized();
})();