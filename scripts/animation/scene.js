/**
 * Created by Jason Zhao Jie on 2016/12/13.
 */

    libArmyAnt.animation.IScene = libArmyAnt.Object.inherit({
        parent:null,
        x:0,
        y:0,
        width:0,
        height:0,

        shown:true,
        running:true,
        background:null,

        children:null,

        ctor:function(parent, x, y, width, height, background){
            this.base.ctor();
            this.x = x;
            this.y = y;
            this.width = width;
            this.height = height;
            this.parent = parent;
            if(background)
                this.background = background;
            this.children = new libArmyAnt.animation.TagIndexList();
        },


        _timerFunc:function(dt){
            this.update(dt);
            for(var k in this.children.lists.length){
                if(this.children.lists[k].running)
                    this.children.lists[k]._timerFunc(dt);
            }
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
            this.running = false;
        },

        resume:function(){
            this.running = true;
        },

        getThisTag:function(){
            return this.parent.getSceneTag(this);
        },

        setZIndex:function(zIndex){
            return this.parent.setSceneZIndex(this, zIndex);
        },

        getZIndex:function(){
            return this.parent.getSceneZIndex(this);
        },

        getChildByTag:function(tag){
            return this.children.get(tag);
        },

        getChildTag:function(scene){
            return this.children.getTag(scene);
        },

        getChildZIndex:function(tagOrNode){
            if(typeof tagOrNode != "string")
                tagOrNode = this.getChildTag(tagOrNode);
            if(!tagOrNode)
                throw "Cannot found the child node";
            return this.children.getZIndex(tagOrNode);
        },

        setChildZIndex:function(tagOrNode, zIndex){
            if(typeof tagOrNode != "string")
                tagOrNode = this.getChildTag(tagOrNode);
            if(!tagOrNode)
                throw "Cannot found the child node";
            return this.children.setZIndex(tagOrNode, zIndex);
        },

        addNode:null,
        removeNode:null,
        createNode:null,
        createSprite:null,
        removeAllNodes:null,
        removeSelf:function(){
            delete this.parent.scenes.lists[tag];
        },
        refresh:null,
        update:null
    });

    libArmyAnt._onInitialized();