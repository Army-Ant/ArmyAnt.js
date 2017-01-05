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
            this.children = new libArmyAnt.animation.TagIndexList();
        },

        _timerFunc:function(dt){
            this.update(dt);
            for(var k in this.children.lists.length){
                if(this.children.lists[k].running)
                    this.children.lists[k]._timerFunc(dt);
            }
        },

        show:function() {
            this.shown = true;
        },

        hide:function(){
            this.shown = false;
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
            return this.parent.getChildTag(this);
        },

        setZIndex:function(zIndex){
            return this.parent.setChildZIndex(this, zIndex);
        },

        getZIndex:function(){
            return this.parent.getChildZIndex(this);
        },

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