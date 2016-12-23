/**
 * Created by Jason Zhao Jie on 2016/12/13.
 */

(function() {
    this.libArmyAnt.animation.IScene = this.libArmyAnt.Object.inherit({
        parent:null,
        x:0,
        y:0,
        width:0,
        height:0,

        shown:true,
        running:true,
        timer:null,
        background:null,

        children:null,

        ctor:function(){
            throw "This interface cannot be created an object";
        },

        _ctor:function(parent, x, y, width, height, background){
            this.base.ctor();
            this.x = x;
            this.y = y;
            this.width = width;
            this.height = height;
            this.parent = parent;
            this.timer = new libArmyAnt.Scheduler(libArmyAnt.animation.factory.refreshTime);
            if(background)
                this.background = background;
            this.timer.run(this.update.bind(this));
            this.children = new libArmyAnt.animation.TagIndexList();
        },

        show:function(){
            this.shown = true;
            this.parent.refresh();
        },

        hide:function(){
            this.shown = false;
            this.parent.refresh();
        },

        pause:function(){
            this.timer.stop();
            for(var k in this.children.lists)
                this.children.get(k).pause();
            this.running = false;
        },

        resume:function(){
            this.timer.callAtOnce();
            for(var k in this.children.lists) {
                var node = this.children.get(k);
                if (node.running)
                    node.resume();
            }
            this.running = true;
        },

        getThisTag:function(){
            this.parent.getSceneTag(this);
        },

        setZIndex:function(zIndex){
            this.parent.setSceneZIndex(this, zIndex);
        },

        getZIndex:function(){
            this.parent.getSceneZIndex(this);
        },

        addNode:null,
        removeNode:null,
        createNode:null,
        removeAllNodes:null,
        removeSelf:function(){
            delete this.parent.scenes.lists[tag];
        },
        refresh:null,
        update:null
    });

    this.libArmyAnt._onInitialized();
})();